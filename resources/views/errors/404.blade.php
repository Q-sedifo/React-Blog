<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}" />

        <!-- Link the shortcut icon -->
        <link rel="shortcut icon" href="{{ asset('icons/shortcut.svg') }}">

        <title>Blog</title>

    </head>
    <body style="color: #fff; font-family: sans-serif; padding: 0; margin: 0; background-image: url({{ asset('img/404.gif') }}); background-size: cover;">
        <div style="width: 100%; height: 100vh; display: flex; justify-content: center; flex-direction: column; align-items: center; font-size: 25px; text-align: center;">
            <h2>Сторінка не знайдена 404.</h2> 
            <a href="/" style="color: #fff;">Повернутися до блогу</a>
        </div>
    </body>
</html>
