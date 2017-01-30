var gulp = require('gulp');
//var compass = require('gulp-compass');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');
var copy = require('gulp-copy');

var tsoptions = require('./app/tsconfig.json')
var webtsoptions = require('./web/tsconfig.json')

gulp.task('default', function() {

});

gulp.task('compileAppSass', function() {
    return gulp.src('./app/src/sass/style.scss')
        .pipe(plumber({ errorHandler: handleError }))
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write('./'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('./app/public/css'));
});

gulp.task('compileWebSass', function() {
    return gulp.src('./web/src/sass/style.scss')
        .pipe(plumber({ errorHandler: handleError }))
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write('./'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('./web/public/css'));
});

gulp.task('tscompile', function() {
    return gulp.src('./app/src/ts/**/*.ts')
        .pipe(plumber({ errorHandler: handleError }))
        .pipe(maps.init())
        .pipe(ts(tsoptions.compilerOptions))
        .pipe(maps.write('./'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('./app/public/'));
});

gulp.task('webcompile', function() {
    return gulp.src('./web/src/ts/**/*.ts')
        .pipe(plumber({ errorHandler: handleError }))
        .pipe(maps.init())
        .pipe(ts(webtsoptions.compilerOptions))
        .pipe(maps.write('./'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('./web/public/app'));
});

gulp.task('templateCopy', function () {
    return gulp.src('./app/src/ts/**/*.html')
        .pipe(gulp.dest('./app/public/'));
});

gulp.task('webtemplateCopy', function () {
    return gulp.src('./web/src/ts/**/*.html')
        .pipe(gulp.dest('./web/public'));
});

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('./app/src/ts/**/*.ts', ['tscompile']);
    gulp.watch('./app/src/ts/**/*.html', ['templateCopy']);

    gulp.watch('./web/src/ts/**/*.ts', ['webtscompile']);
    gulp.watch('./web/src/ts/**/*.html', ['webtemplateCopy']);

    gulp.watch('./app/src/sass/**/*.scss', ['compileAppSass']);
    gulp.watch('./web/src/sass/**/*.scss', ['compileWebSass']);

    gulp.watch(['./app/public/**']).on('change', livereload.changed);
});

gulp.task('build', ['compileAppSass', 'tscompile', 'templateCopy']);
gulp.task('buildweb', ['compileWebSass', 'webtscompile', 'webtemplateCopy'])
