@php
    /** @var \WebDevEtc\BlogEtc\Models\Post $post */
@endphp
{{--Used on the index page (so shows a small summary--}}
{{--See the guide on webdevetc.com for how to copy these files to your /resources/views/ directory--}}
{{--https://webdevetc.com/laravel/packages/blogetc-blog-system-for-your-laravel-app/help-documentation/laravel-blog-package-blogetc#guide_to_views--}}

<div class="" style='max-width:800px; margin: 50px auto; background: #f4fafd;border-radius:3px;padding:0;'>


    <div style='padding:10px;'>
        <h3 class='title'><a href='{{$post->url()}}'>{{$post->title}}</a></h3>
        <h5 class=''>{{$post->subtitle}}</h5>

        <p>{!! $post->generateIntroduction(400) !!}</p>
    </div>
    <div class='text-center'>
        <?=$post->imageTag('medium', true, ''); ?>
    </div>
</div>

