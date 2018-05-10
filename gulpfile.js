'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const concat_js = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const minify_css = require('gulp-clean-css');
const concat_css = require('gulp-concat-css');
const workbox_build = require('workbox-build');

gulp.task('css', _ => {
    return gulp.src('src/**/*.css')
        .pipe(minify_css())
        .pipe(concat_css('main.min.css'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('js', _ => {
    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat_js('main.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/js'));
});

gulp.task('service-worker', () => {
    return workbox_build.generateSW({
        globDirectory: 'public',
        globPatterns: [
            '**\/*.{html,json,js,css}',
        ],
        swDest: 'public/sw.js',
    });
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.css', ['css']);
  gulp.watch('src/**/*.js', ['js']);
});

gulp.task('default', ['watch', 'css', 'js']);