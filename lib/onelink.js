/*jshint node:true */
'use strict';

var util = require('./util');
var useref = require('./useref');


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
        var parts = key.split(useref.sectionsJoinChar);

        // var buildname = parts[0];
        var buildtype = parts[0];
        var blockId = parts[1];

        content = replaceContent(content, block, buildtype, blockId);
    });

    return content;
}


function replaceContent(content, block, type, blockId) {

    var linefeed = /\r\n/g.test(content) ? '\r\n' : '\n',
        lines = block.split(linefeed),
        ref = '',
        indent = (lines[0].match(/^\s*/) || [])[0],
        blockContent = lines.slice(1, -1).join('');

    if (type === 'js') {
        if (blockContent.search(useref.regscript) !== -1) {
            ref = util.oneLinkJs(blockContent);
        }
    } else if (type === 'css') {
        if( blockContent.search(useref.regcss) !== -1 ) {
            ref = util.oneLinkCss(blockContent);
        }
    }

    ref = indent + ref;

    return content.replace(block, ref);
}


exports.oneLink = oneLink;
