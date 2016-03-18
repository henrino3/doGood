'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('build:dev', function() {
  var b = browserify({
    entries: './src/index.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(rename('ng-syncano.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build:prod', function() {
  var b = browserify({
    entries: './src/index.js'
  });

  return b.bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(rename('ng-syncano.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['build:dev', 'build:prod']);

gulp.task('default', ['build']);
