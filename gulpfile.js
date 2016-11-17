var gulp = require('gulp');
//var compass = require('gulp-compass');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');
var copy = require('gulp-copy');

var tsoptions = require('./tsconfig.json')

gulp.task('default', function() {

});

gulp.task('compileSass', function() {
    return gulp.src('src/sass/style.scss')
        .pipe(plumber({ errorHandler: handleError }))
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write('./'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('public/css'));
});

gulp.task('tscompile', function() {
    return gulp.src('./src/ts/**/*.ts')
        .pipe(plumber({ errorHandler: handleError }))
        .pipe(maps.init())
        .pipe(ts(tsoptions.compilerOptions))
        .pipe(maps.write('./'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('./public/'));
});

gulp.task('templateCopy', function () {
    return gulp.src('./src/ts/**/*.html')
        .pipe(gulp.dest('./public/'));
});

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('./src/ts/**/*.ts', ['tscompile']);
    gulp.watch('./src/ts/**/*.html', ['templateCopy']);
    gulp.watch('./src/sass/**/*.scss', ['compileSass']);

    gulp.watch(['public/**']).on('change', livereload.changed);
});

gulp.task('build', ['compileSass', 'tscompile', 'templateCopy']);
