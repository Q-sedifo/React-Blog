<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}" />

        <!-- Link the shortcut icon -->
        <link rel="shortcut icon" href="{{ asset('icons/shortcut.svg') }}">

        <!-- Link manifest -->
        <link rel="manifest" href="{{ asset('build/manifest.json') }}">
        <meta name="theme-color" content="#1c1c1e" />
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">

        <title>Blog</title>

        @viteReactRefresh
        @vite('resources/js/app.js')
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
