<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <link rel="shortcut icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="/manifest.json">

    <title>{{ config('app.name', 'Laravel') }} - Error 500</title>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

</head>
<body class="authentication-bg">
<div id="root" class="error-page">
    <div class="mt-5"></div>
    <div class="justify-content-center row">
        <div class="col-lg-4">
            <div class="text-center"><img src="/denta/img/file-searching.svg" height="90" alt="">
                <h1 class="text-error mt-4">500</h1><h4 class="text-uppercase text-danger mt-3">Page Not Found</h4>
                <p class="text-muted mt-3">It's looking like you may have taken a wrong turn. Don't worry... it happens to the best of us.
                    Here's a little tip that might help you get back on track.</p><a class="btn btn-info mt-3" href="/"><i
                            class="mdi mdi-reply"></i> Return Home</a></div>
        </div>
    </div>
</div>
</body>
</html>
