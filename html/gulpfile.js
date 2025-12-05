'use strict';

var gulp = require('gulp'),
    rigger = require('gulp-rigger'),
    sass = require('gulp-sass'),
    minify = require('gulp-minify'),
    include = require('gulp-include'),
    browserSync = require('browser-sync').create();

var path = {
    build: {
        html: 'build/',
        css: 'build/css/',
        js: 'build/js/',
        jsLib: 'build/js/lib',
        img: 'build/img/',
        font: 'build/font/',
        json: 'build/Questions/',
        vendor: 'build/vendor',
        images: 'build/images'
    },
    src: {
        html: 'src/*.html',
        scss: 'src/scss/*.scss',
        js: ['src/js/*.js', 'node_modules/bootstrap/dist/js/bootstrap.bundle.js.map'],
        jsLib: 'src/js/lib/*.js',
        img: 'src/img/*.*',
        font: 'src/font/*.*',
        json: 'src/Questions/*.*',
        vendorCSS: 'src/vendor/**/*.css',
        vendor: 'src/vendor/**/*.*',
        images: 'src/images/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        scss: 'src/scss/**/*.scss',
        js: 'src/js/**/*.js',
        jsLib: 'src/js/lib/**/*.js',
        img: 'src/img/**/*.*',
        font: 'src/font/**/*.*',
        json: 'src/Questions/**/*.*',
        vendor: 'src/vendor/**/*.*',
        vendorCSS: 'src/vendor/**/*.css',
        images: 'src/images/**/*.*'
    }
};

gulp.task('html:build', async function() {
    return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('vendor:copy', async function(){
    return gulp.src(path.src.vendor)
        .pipe(gulp.dest(path.build.vendor))
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('css:build', async function() {
    return gulp.src(path.src.scss, path.src.vendorCSS)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('js:build', async function() {
    return gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(minify())
        .pipe(include())
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('js:copy', async function() {
    return gulp.src(path.src.jsLib)
        .pipe(gulp.dest(path.build.jsLib))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('img:copy', async function() {
    return gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('images:copy', async function() {
    return gulp.src(path.src.images)
        .pipe(gulp.dest(path.build.images))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('font:copy', async function() {
    return gulp.src(path.src.font)
        .pipe(gulp.dest(path.build.font))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('Questions:copy', async function() {
    return gulp.src(path.src.json)
        .pipe(gulp.dest(path.build.json))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browserSync', async function() {
    browserSync.init({
        server: {
            baseDir: 'build'
        }
    })
})

gulp.task('watcher', async function() {
    gulp.watch(path.watch.html, gulp.parallel('html:build'));
    gulp.watch(path.watch.scss, gulp.parallel('css:build'));
    gulp.watch(path.watch.vendorCSS, gulp.parallel('css:build'));
    gulp.watch(path.watch.js, gulp.parallel('js:build'));
    gulp.watch(path.watch.js, gulp.parallel('js:copy'));
    gulp.watch(path.watch.img, gulp.parallel('img:copy'));
    gulp.watch(path.watch.images, gulp.parallel('images:copy'));
    gulp.watch(path.watch.img, gulp.parallel('font:copy'));
    gulp.watch(path.watch.img, gulp.parallel('Questions:copy'));
    gulp.watch(path.watch.vendor, gulp.parallel('vendor:copy'))
});

gulp.task('default', gulp.parallel('html:build', 'css:build', 'js:build', 'js:copy', 'img:copy', 'font:copy', 'Questions:copy', 'images:copy', 'vendor:copy', 'watcher', 'browserSync'));


