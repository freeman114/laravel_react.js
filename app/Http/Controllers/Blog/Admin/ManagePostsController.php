<?php

namespace App\Http\Controllers\Blog\Admin;

use App\Http\Controllers\Controller;
use Auth;
use Carbon\Carbon;
use Exception;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;
use Illuminate\View\View;
use RuntimeException;
use WebDevEtc\BlogEtc\Events\BlogPostAdded;
use WebDevEtc\BlogEtc\Events\BlogPostEdited;
use WebDevEtc\BlogEtc\Events\BlogPostWillBeDeleted;
use WebDevEtc\BlogEtc\Helpers;
use WebDevEtc\BlogEtc\Interfaces\BaseRequestInterface;
use App\Http\Middleware\UserCanManageBlogPosts;
use WebDevEtc\BlogEtc\Models\BlogEtcPost;
use WebDevEtc\BlogEtc\Models\UploadedPhoto;
use WebDevEtc\BlogEtc\Requests\CreateBlogEtcPostRequest;
use WebDevEtc\BlogEtc\Requests\DeleteBlogEtcPostRequest;
use WebDevEtc\BlogEtc\Requests\UpdateBlogEtcPostRequest;
use WebDevEtc\BlogEtc\Traits\UploadFileTrait;

/**
 * Class BlogEtcAdminController.
 */
class ManagePostsController extends Controller
{
    use UploadFileTrait;

    /**
     * BlogEtcAdminController constructor.
     */
    public function __construct()
    {
        $this->middleware(UserCanManageBlogPosts::class);

        if (!is_array(config('blogetc'))) {
            throw new RuntimeException('The config/blogetc.php does not exist. Publish the vendor files for the Blog package by running the php artisan publish:vendor command');
        }
    }

    /**
     * View all posts.
     *
     * @return mixed
     */
    public function index()
    {
        $posts = BlogEtcPost::orderBy('posted_at', 'desc')
            ->paginate(10);

        return view('blogetc_admin::index', ['posts' => $posts]);
    }

    /**
     * Show form for creating new post.
     *
     * @return Factory|View
     */
    public function create_post()
    {
        return view('blogetc_admin::posts.add_post');
    }

    /**
     * Save a new post.
     *
     * @throws Exception
     *
     * @return RedirectResponse|Redirector
     */
    public function store_post(CreateBlogEtcPostRequest $request)
    {
        $new_blog_post = new BlogEtcPost($request->all());

        $this->processUploadedImages($request, $new_blog_post);

        if (!$new_blog_post->posted_at) {
            $new_blog_post->posted_at = Carbon::now();
        }

        $new_blog_post->user_id = Auth::user()->id;
        $new_blog_post->save();

        $new_blog_post->categories()->sync($request->categories());

        Helpers::flashMessage('Added post');
        event(new BlogPostAdded($new_blog_post));

        return redirect($new_blog_post->editUrl());
    }

    /**
     * Process any uploaded images (for featured image).
     *
     * @param $new_blog_post
     *
     * @throws Exception
     *
     * @todo - next full release, tidy this up!
     */
    protected function processUploadedImages(BaseRequestInterface $request, BlogEtcPost $new_blog_post)
    {
        if (!config('blogetc.image_upload_enabled')) {
            return;
        }

        $this->increaseMemoryLimit();

        $uploaded_image_details = [];

        foreach ((array) config('blogetc.image_sizes') as $size => $image_size_details) {
            if ($image_size_details['enabled'] && $photo = $request->get_image_file($size)) {
                $uploaded_image = $this->UploadAndResize($new_blog_post, $new_blog_post->title, $image_size_details,
                    $photo);

                $new_blog_post->$size = $uploaded_image['filename'];
                $uploaded_image_details[$size] = $uploaded_image;
            }
        }

        // todo: link this to the blogetc_post row.
        if (count(array_filter($uploaded_image_details)) > 0) {
            UploadedPhoto::create([
                'source'          => 'BlogFeaturedImage',
                'uploaded_images' => $uploaded_image_details,
            ]);
        }
    }

    /**
     * Show form to edit post.
     *
     * @param $blogPostId
     *
     * @return mixed
     */
    public function edit_post($blogPostId)
    {
        $post = BlogEtcPost::findOrFail($blogPostId);

        return view('blogetc_admin::posts.edit_post')->withPost($post);
    }

    /**
     * Save changes to a post.
     *
     * @param $blogPostId
     *
     * @throws Exception
     *
     * @return RedirectResponse|Redirector
     */
    public function update_post(UpdateBlogEtcPostRequest $request, $blogPostId)
    {
        /** @var BlogEtcPost $post */
        $post = BlogEtcPost::findOrFail($blogPostId);
        $post->fill($request->all());

        $this->processUploadedImages($request, $post);

        $post->save();
        $post->categories()->sync($request->categories());

        Helpers::flashMessage('Updated post');
        event(new BlogPostEdited($post));

        return redirect($post->editUrl());
    }

    /**
     * Delete a post.
     *
     * @param $blogPostId
     *
     * @return mixed
     */
    public function destroy_post(DeleteBlogEtcPostRequest $request, $blogPostId)
    {
        $post = BlogEtcPost::findOrFail($blogPostId);
        event(new BlogPostWillBeDeleted($post));

        $post->delete();

        // todo - delete the featured images?
        // At the moment it just issues a warning saying the images are still on the server.

        return view('blogetc_admin::posts.deleted_post')
            ->withDeletedPost($post);
    }
}
