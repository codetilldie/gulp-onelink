# gulp-onelink

> Parse build blocks in HTML files to combo non-optimized js or css links.

Inspired by the grunt plugin [grunt-useref](https://github.com/pajtai/grunt-useref).


## Install

Install with [npm]

```
npm install --save-dev xuyang2/gulp-onelink
```


## Usage

    gulp.task('dlc.html', function() {
        gulp.src('webdev/lottery/dlc/*.html')
            .pipe(onelink())
            .pipe(gulp.dest('webapp/lottery/dlc'));
    });

```


An example of this in completed form can be seen below:

    <html>
    <head>
    </head>
    <body>

        <!-- build:onelink js id1 -->
        <script type="text/javascript" src="../js/vendor/underscore/1.6.0/underscore.min.js"></script>
        <script type="text/javascript" src="../js/vendor/zepto/1.1.4/zepto-custom.min.js"></script>
        <script type="text/javascript" src="../js/esun/base/esun_def.js"></script>
        <script type="text/javascript" src="../js/esun/config/env.js"></script>
        <script type="text/javascript" src="../js/esun/util/querystring.js"></script>
        <script type="text/javascript" src="../js/esun/user/esun.user.js"></script>
        <script type="text/javascript" src="../js/esun/ajax/ajaxservice.js"></script>
        <script type="text/javascript" src="../js/esun/util/esun.motion.js"></script>
        <script type="text/javascript" src="../js/esun/util/esun.countdown.js"></script>
        <script type="text/javascript" src="../js/esun/ajax/url/dlt.js"></script>
        <script type="text/javascript" src="../js/esun/base/view.js"></script>
        <script type="text/javascript" src="../js/esun/lottery/config.js"></script>
        <script type="text/javascript" src="../js/esun/lottery/buy.js"></script>
        <!-- endbuild -->

        <!-- build:onelink js id2 -->
        <script type="text/javascript" src="../resource/js/vendor/underscore/underscore.min.js"></script>
        <script type="text/javascript" src="../resource/js/vendor/cookies-js/cookies.min.js"></script>
        <script type="text/javascript" src="../resource/js/vendor/angular/angular.min.js"></script>
        <script type="text/javascript" src="../resource/js/vendor/angular-route/angular-route.min.js"></script>
        <script type="text/javascript" src="../resource/js/vendor/angular-touch/angular-touch.min.js"></script>
        <script type="text/javascript" src="../resource/js/vendor/iscroll/iscroll.min.js"></script>
        <!-- endbuild -->

        <!-- build:onelink js id3 -->
        <script type="text/javascript" src="js/app.js"></script>
        <script type="text/javascript" src="js/service.js"></script>
        <script type="text/javascript" src="js/controller.js"></script>
        <!-- endbuild -->

    </body>
    </html>



The resulting HTML would be:

    <html>
    <head>
    </head>
    <body>

        <script type="text/javascript" src="../js/??vendor/underscore/1.6.0/underscore.min.js,vendor/zepto/1.1.4/zepto-custom.min.js,esun/base/esun_def.js,esun/config/env.js,esun/util/querystring.js,esun/user/esun.user.js,esun/ajax/ajaxservice.js,esun/util/esun.motion.js,esun/util/esun.countdown.js,esun/ajax/url/dlt.js,esun/base/view.js,esun/lottery/config.js,esun/lottery/buy.js"></script>

        <script type="text/javascript" src="../resource/js/vendor/??underscore/underscore.min.js,cookies-js/cookies.min.js,angular/angular.min.js,angular-route/angular-route.min.js,angular-touch/angular-touch.min.js,iscroll/iscroll.min.js"></script>

        <script type="text/javascript" src="js/??app.js,service.js,controller.js"></script>

    </body>
    </html>


## API