/*jshint node:true */
'use strict';

var util = require('./util');
var useref = require('./useref');

var sectionsJoinChar = '\ue000';
var regscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gmi;

function oneLink(html) {
    var blocks = useref.getBlocks(html);
    return updateBlocks(blocks, html)
}


function updateBlocks(blocks, content) {

    // Determine the linefeed from the content
    var linefeed = /\r\n/g.test(content) ? '\r\n' : '\n';

    // handle blocks
    Object.keys(blocks).forEach(function (key) {
        var block = blocks[key].join(linefeed);
        var parts = key.split(sectionsJoinChar);
        var buildname = parts[0];
        var buildtype = parts[1];
        var id = parts[2];

        if (buildname === 'onelink') {
            content = replaceContent(content, block, buildtype, id);
        }
    });

    return content;
}


function replaceContent(content, block, type, id) {

    var linefeed = /\r\n/g.test(content) ? '\r\n' : '\n',
        lines = block.split(linefeed),
        ref = '',
        indent = (lines[0].match(/^\s*/) || [])[0],
        blockContent = lines.slice(1, -1).join('');

    if (type === 'js') {
        if (blockContent.search(regscript) !== -1) {
            ref = util.oneLinkJs(blockContent);
        }
    } else if (type === 'css') {
        // todo
    }

    ref = indent + ref;

    return content.replace(block, ref);
}


exports.oneLink = oneLink;
