'use strict';

var config = require('./config');
var settings = config.settings;

var gulp = require('gulp');
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');

module.exports = function(callback) {
    var distPath = config.releasePath + '/css';
    var srcPath = config.projectPath + config.lessSource + '*.less';

    gulp.src(srcPath)
        .pipe(plumber(settings.plumber))
        .pipe(less())
        .pipe(prefix(settings.prefix))
        .pipe(minify())
        .pipe(rename(settings.rename.minCss))
        .pipe(gulp.dest(distPath))
        .on('end', callback)
}