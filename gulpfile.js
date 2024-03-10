'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    cleanCss = require('gulp-clean-css'),
    debug = require('gulp-debug'),
    sassVariables = require('gulp-sass-variables'),
    livereload = require('gulp-livereload');

const scssInputDir = 'assets/scss/';
const cssOutputDir = 'assets/css/';

gulp.task('style', (done) => {
    return gulp.src(scssInputDir + 'style.scss')
        .pipe(sassVariables({
            $assetHost: ''
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssOutputDir))
        .pipe(livereload()); // Trigger live reload after styles are compiled
});

// Watch task
gulp.task('watch', () => {
    livereload.listen(); // Start live reload server

    gulp.watch(scssInputDir + '**/*.scss', gulp.series('style'));
});

// Adding 'style' as the default task
gulp.task('default', gulp.series('style', 'watch'));
