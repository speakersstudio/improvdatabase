var gulp = require('gulp');
var compass = require('gulp-compass');
//var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');

var tsoptions = require('./tsconfig.json')

gulp.task('default', function() {

});

gulp.task('compileCompass', function() {
    return gulp.src('src/sass/*.scss')
        .pipe(maps.init())
        .pipe(compass({
            project: __dirname,
            css: 'public/css',
            sass: 'sass'
        }))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('./public/css'));
});

/*
// not used currently, but once I get the SCSS files away from compass it will be
gulp.task('compileSass', function() {
    return gulp.src('src/sass/style.scss')
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('public/css'));
});
*/

gulp.task('tscompile', function() {
    return gulp.src('./src/ts/**/*.ts')
        .pipe(maps.init())
        .pipe(ts(tsoptions.compilerOptions))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('./public/'));
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('./src/ts/**/*.ts', ['tscompile']);
    gulp.watch('./src/sass/**/*.scss', ['compileSass']);

    gulp.watch(['public/**']).on('change', livereload.changed);
});

gulp.task('build', ['compileCompass', 'tscompile']);
