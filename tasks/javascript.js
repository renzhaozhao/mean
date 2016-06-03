"use strict";

var config = require('./config');
var settings = config.settings;

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var ac = require('./copyright');

module.exports = function(callback) {
    var distPath = config.releasePath + '/js';
    var srcPath = config.projectPath + config.jsSource + '**/*.js';

    gulp.src(srcPath)
        .pipe(plumber(settings.plumber))
        .pipe(concat('main.min.js'))
        .pipe(uglify({
            preserverComments: !true,
            ascii_only: true,
        }))
        .pipe(ac())
        .pipe(gulp.dest(distPath))
        .on('end', callback)
}