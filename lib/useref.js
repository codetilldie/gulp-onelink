/*jshint node:true */
'use strict';

// start build pattern: <!-- build:[target] output -->
// $1 is the type, $2 is the alternate search path, $3 is the destination file name $4 extra attributes
var regbuild = /<!--\s*build:(\w+)(?:\(([^\)]+)\))?\s*([^\s]+)?\s*(?:(.*))?\s*-->/;

// end build pattern -- <!-- endbuild -->
var regend = /<!--\s*endbuild\s*-->/;

// IE conditional comment pattern: $1 is the start tag and $2 is the end tag
var regcc = /(<!--\[if\s.*?\]>)[\s\S]*?(<!\[endif\]-->)/i;

// script element regular expression
// TODO: Detect 'src' attribute.
var regscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gmi;

// css link element regular expression
// TODO: Determine if 'href' attribute is present.
var regcss = /<link.*?>/gmi;

// Character used to create key for the `sections` object. This should probably be done more elegantly.
var sectionsJoinChar = '\ue000';

exports.regscript = regscript;
exports.regcss = regcss;
exports.sectionsJoinChar = sectionsJoinChar;

// Returns a hash object of all the directives for the given html. Results is
// of the following form:
//
//     {
//        'css/site.css ':[
//          '  <!-- build:css css/site.css -->',
//          '  <link rel="stylesheet" href="css/style.css">',
//          '  <!-- endbuild -->'
//        ],
//        'js/head.js ': [
//          '  <!-- build:js js/head.js -->',
//          '  <script src="js/libs/modernizr-2.5.3.min.js"></script>',
//          '  <!-- endbuild -->'
//        ],
//        'js/site.js ': [
//          '  <!-- build:js js/site.js -->',
//          '  <script src="js/plugins.js"></script>',
//          '  <script src="js/script.js"></script>',
//          '  <!-- endbuild -->'
//        ]
//     }
//
function getBlocks(body) {
    var lines = body.replace(/\r\n/g, '\n').split(/\n/),
        block = false,
        sections = {},
        last,
        removeBlockIndex = 0;

    lines.forEach(function (l) {
        var build = l.match(regbuild),
            endbuild = regend.test(l);

        if (build) {
            block = true;

            if (build[1] === 'remove') {
                build[3] = String(removeBlockIndex++);
            }
            if (build[4]) {
                sections[[build[1], build[3].trim(), build[4].trim()].join(sectionsJoinChar)] = last = [];
            } else {
                sections[[build[1], build[3].trim()].join(sectionsJoinChar)] = last = [];
            }
        }

        // switch back block flag when endbuild
        if (block && endbuild) {
            last.push(l);
            block = false;
        }

        if (block && last) {
            last.push(l);
        }
    });

    // sections is an array of lines starting with the build block comment opener,
    // including all the references and including the build block comment closer.
    return sections;
}

exports.getBlocks = getBlocks;



