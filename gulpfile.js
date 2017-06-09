var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var sync = require('browser-sync').create();
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
// var pxtorem = require('postcss-pxtorem-plus');
var cssnano = require('cssnano');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

var config = {
    path: '.'
}

var onError = function (err) {
    notify({
         title: 'Gulp Task Error',
         message: 'Check the console.'
     }).write(err);

     console.log(err.toString());

     this.emit('end');
}

gulp.task('sass', function() {

    var processors = [
        autoprefixer({ browsers: ['last 2 versions'] }),
        // pxtorem({
        //     propList: ['*'],
        //     replace: false
        // }),
        cssnano
    ];

    return gulp.src(config.path + '/src/scss/main.scss')
    .pipe(plumber({ errorHandle: onError }))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.path + '/dist/css/'))
    .pipe(sync.stream());

});

gulp.task('images', function() {

    return gulp.src(config.path + '/src/img/**/*')
    .pipe(imagemin({
        optimizationLevel: 7,
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest(config.path + '/dist/img/'))
    .pipe(sync.stream())

});

gulp.task('scripts', function() {

    browserify({ debug: true })
		    .transform(babelify.configure({
          presets: ["es2015"]
        }))
		    .require(config.path + '/src/js/main.js', { entry: true })
		    .bundle()
		    .on('error', gutil.log)
		    .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.path + '/dist/js/'));

});

gulp.task('html', function() {

	gulp.src('index.html')
	.pipe(gulp.dest('./dist/'))
  .pipe(sync.stream());

});

gulp.task('sync', function() {

  sync.init({
    server: './dist'
  })

  gulp.watch('./index.html', ['html']);
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/js/**/*.js', ['scripts']);
  gulp.watch('./src/img/**/*', ['images']);
});

gulp.task('default', ['html', 'images', 'sass', 'scripts', 'sync']);
