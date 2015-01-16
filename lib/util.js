/*jshint node:true */
'use strict';

var cheerio = require('cheerio');

function getJsLinks(html) {
    var $ = cheerio.load('');
    var $el = $(html).filter('script');
    return $el;
}

function getJsSrc($el) {
    var $ = cheerio.load('');
    var arr = [];
    $el.each(function (i, elem) {
        var src = $(this).attr('src');
        src = dropQuery(src);
        arr.push(src);
    });
    return arr;
}

function getCssLinks(html) {
    var $ = cheerio.load('');
    var $el = $(html).filter('link');
    return $el;
}

function getCssSrc($el) {
    var $ = cheerio.load('');
    var arr = [];
    $el.each(function (i, elem) {
        var src = $(this).attr('href');
        src = dropQuery(src);
        arr.push(src);
    });
    return arr;
}

function dropQuery(src) {
    if (src.indexOf('?') >= 0) {
        src = src.split('?')[0];
    }
    return src;
}

function getCommonParentPath(src) {
    var srcParts = src.map(function (s) {
        return s.split('/');
    });

    var p = srcParts[0];

    var parent = '';
    for (var n = p.length - 1; n > 0; n--) {
        var candidate = p.slice(0, n).join('/') + '/';
        if (isCommonParent(src, candidate)) {
            parent = candidate;
            break;
        }
    }

    var tail = src.map(function (s) {
        return s.substring(parent.length);
    });

    return {
        parent: parent,
        tail: tail
    }
}

function isCommonParent(src, path) {
    return src.every(function (s) {
        return s.indexOf(path) === 0;
    });
}

function oneLinkJs(html) {
    var $el = getJsLinks(html);
    var src = getJsSrc($el);
    var obj = getCommonParentPath(src);
    var srcConcat = obj.parent + "??" + obj.tail.join(",");
    return '<script type="text/javascript" src="' + srcConcat + '"></script>';
}

function oneLinkCss(html) {
    var $el = getCssLinks(html);
    var src = getCssSrc($el);
    var obj = getCommonParentPath(src);
    var srcConcat = obj.parent + "??" + obj.tail.join(",");
    return '<link type="text/css" rel="stylesheet" href="' + srcConcat + '" />';
}


exports.oneLinkJs = oneLinkJs;
exports.oneLinkCss = oneLinkCss;
