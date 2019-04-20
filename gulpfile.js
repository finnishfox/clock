const gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-html-minifier2'),
    uglify = require('gulp-uglify-es').default,
    include = require("gulp-include"),
    csso = require('gulp-csso'),
    autoprefixer = require('gulp-autoprefixer');

const outFolder = 'docs';


gulp.task('connect', () =>
    connect.server({
        root: outFolder
    }));

gulp.task('html', () =>
    gulp.src('./src/pages/*.html')
        .pipe(include())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(`./${outFolder}`))
        .pipe(connect.reload()));


gulp.task('sass-to-css', () => gulp.src([ 'src/styles/blocks/*.scss', 'src/styles/fonts.scss'])
    .pipe(sass())
    .pipe(concat('styles.css'))
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'ie >= 11'],
        cascade: false
    }))
    .pipe(csso())
    .pipe(gulp.dest(`./${outFolder}/styles`)));

gulp.task('js', () => gulp.src('src/scripts/blocks/*.js')
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest(`./${outFolder}/scripts`)));


gulp.task('watch', () =>
    gulp.watch(['./src/**/**'], [
        'html',
        'sass-to-css',
        'js']));

gulp.task('default', ['html', 'connect', 'sass-to-css', 'js', 'watch']);