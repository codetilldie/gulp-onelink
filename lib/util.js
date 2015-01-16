/*jshint node:true */
'use strict';

var cheerio = require('cheerio');

function getScriptLinks(html) {
    var $ = cheerio.load('');
    var $el = $(html).filter('script');
    return $el;
}

function getScriptSrc($el) {
    var $ = cheerio.load('');
    var arr = [];
    $el.each(function (i, elem) {
        var src = $(this).attr('src');
        if (src.indexOf('?') >= 0) {
            src = src.split('?')[0];
        }
        arr.push(src);
    });
    return arr;
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
    var $el = getScriptLinks(html);
    var src = getScriptSrc($el);
    var obj = getCommonParentPath(src);
    var srcConcat = obj.parent + "??" + obj.tail.join(",");
    return '<script type="text/javascript" src="' + srcConcat + '"></script>';
}


exports.oneLinkJs = oneLinkJs;
