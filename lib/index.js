/*jshint node:true */
'use strict';

var through = require('through2');
var gutil = require('gulp-util');

var onelink = require('./onelink');

var PluginError = gutil.PluginError;

// consts
var PLUGIN_NAME = 'gulp-one-link';

// plugin level function (dealing with files)
function gulpOneLink(opts) {

    // creating a stream through which each file will pass
    var stream = through.obj(function (file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }

        if (file.isBuffer()) {
            file.contents = new Buffer(onelink.oneLink(file.contents.toString()));
        }

        // make sure the file goes through the next gulp plugin
        this.push(file);

        // tell the stream engine that we are done with this file
        cb();
    });

    // returning the file stream
    return stream;
}

// exporting the plugin main function
module.exports = gulpOneLink;
