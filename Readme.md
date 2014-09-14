# client side app boilerplate code

This is boilerplate code for easy, client-side application asset compilation.

## usage

1. live build
```
gulp watch
```

2. build at once
```
gulp build
```

## assumptions

- assets are all compiled using gulp
- assets are assumed to be in the ``/src`` directory.
- ``/src/js/index.js`` become s``/public/bundle.min.js``
- all .jade files in ``/src/templates/``` become ``/src/templates/{templatename}.js``
- all .scss files become ``/src/css/{stylesheetname}.css`` and the concat into ``/public/style.css``

