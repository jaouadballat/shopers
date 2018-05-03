'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const watch = require('gulp-watch');
const concat_js = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const minify_css = require('gulp-csso');
const concat_css = require('gulp-concat-css');

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

gulp.task('start', _ => {
    nodemon({
        script: './bin/www',
        ext: 'js css ejs',
        tasks: ['default']
    });
});

gulp.task('default', ['css', 'js', 'start'], _ => {
    gulp.watch('src/**/*.css', _ => gulp.run('css'));
    gulp.watch('src/**/*.js', _=> gulp.run('js'));
});