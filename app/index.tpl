<!doctype html>
<html {% if (o.htmlWebpackPlugin.files.manifest) { %} manifest="{%= o.htmlWebpackPlugin.files.manifest %}" {% } %}>

    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>{%= o.htmlWebpackPlugin.options.title || 'Webpack' %}</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {% for (var css in o.htmlWebpackPlugin.files.css) { %}
        <link rel="stylesheet" type="text/css" href="{%= o.htmlWebpackPlugin.files.css[css] %}">
        {% } %}

    </head>
    <body>
        <div id="app"></div>

        {% for (var chunk in o.htmlWebpackPlugin.files.chunks) { %}
        <script src="{%= o.htmlWebpackPlugin.files.chunks[chunk].entry %}"></script>
        {% } %}
    </body>
</html>