# gulp-onelink

> Parse build blocks in HTML files to combo js or css links.

## Install

Install with [npm]

```
npm install --save-dev gulp-onelink@0.1.0
```


## Usage

```js
var gulp = require('gulp');
var onelink = require('gulp-onelink');

gulp.task('dlc.html', function() {
    gulp.src('webdev/lottery/dlc/*.html')
        .pipe(onelink())
        .pipe(gulp.dest('webapp/lottery/dlc'));
});
```


An example of this in completed form can be seen below:

    <html>
    <head>

        <!-- onelink:css id1 -->
        <link type="text/css" rel="stylesheet" href="http://cache.500boss.com/mobile/widget/head/head.css"/>
        <link type="text/css" rel="stylesheet" href="http://cache.500boss.com/mobile/widget/alert/alert.css"/>
        <link type="text/css" rel="stylesheet" href="http://cache.500boss.com/mobile/widget/navbox/navbox.css"/>
        <link type="text/css" rel="stylesheet" href="http://cache.500boss.com/mobile/widget/topbtns/topbtns.css"/>
        <link type="text/css" rel="stylesheet" href="http://cache.500boss.com/mobile/widget/foot/foot.css"/>
        <link type="text/css" rel="stylesheet" href="http://cache.500boss.com/mobile/touch/css/jingcai.css"/>
        <!-- endonelink -->

    </head>
    <body>

        <!-- onelink:js lib -->
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
        <!-- endonelink -->

        <!-- onelink:js vendor -->
        <script type="text/javascript" src="../resource/js/vendor/underscore/underscore.min.js"></script>
        <script type="text/javascript" src="../resource/js/vendor/cookies-js/cookies.min.js"></script>
        <script type="text/javascript" src="../resource/js/vendor/angular/angular.min.js"></script>
        <script type="text/javascript" src="../resource/js/vendor/angular-route/angular-route.min.js"></script>
        <script type="text/javascript" src="../resource/js/vendor/angular-touch/angular-touch.min.js"></script>
        <script type="text/javascript" src="../resource/js/vendor/iscroll/iscroll.min.js"></script>
        <!-- endonelink -->

        <!-- onelink:js app -->
        <script type="text/javascript" src="js/app.js"></script>
        <script type="text/javascript" src="js/service.js"></script>
        <script type="text/javascript" src="js/controller.js"></script>
        <!-- endonelink -->

    </body>
    </html>



The resulting HTML would be:

    <html>
    <head>

        <link type="text/css" rel="stylesheet" href="http://cache.500boss.com/mobile/??widget/head/head.css,widget/alert/alert.css,widget/navbox/navbox.css,widget/topbtns/topbtns.css,widget/foot/foot.css,touch/css/jingcai.css" />

    </head>
    <body>

        <script type="text/javascript" src="../js/??vendor/underscore/1.6.0/underscore.min.js,vendor/zepto/1.1.4/zepto-custom.min.js,esun/base/esun_def.js,esun/config/env.js,esun/util/querystring.js,esun/user/esun.user.js,esun/ajax/ajaxservice.js,esun/util/esun.motion.js,esun/util/esun.countdown.js,esun/ajax/url/dlt.js,esun/base/view.js,esun/lottery/config.js,esun/lottery/buy.js"></script>

        <script type="text/javascript" src="../resource/js/vendor/??underscore/underscore.min.js,cookies-js/cookies.min.js,angular/angular.min.js,angular-route/angular-route.min.js,angular-touch/angular-touch.min.js,iscroll/iscroll.min.js"></script>

        <script type="text/javascript" src="js/??app.js,service.js,controller.js"></script>

    </body>
    </html>


## API