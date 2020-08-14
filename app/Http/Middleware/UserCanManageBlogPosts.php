<?php

namespace App\Http\Middleware;

use Auth;
use Closure;

/**
 * Class UserCanManageBlogPosts.
 */
class UserCanManageBlogPosts
{
    /**
     * Show 401 error if \Auth::user()->canManageBlogEtcPosts() == false.
     *
     * TODO: replace with gates
     *
     * @param $request
     *
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        if (!Auth::check()) {
           session()->put('url.intended', route("blogetc.admin.index"));
           return redirect("login");
        }
        if (!Auth::user()->canManageBlogEtcPosts()) {
            abort(401, 'User not authorised to manage blog posts: Your account is not authorised to edit blog posts');
        }

        return $next($request);
    }
}
