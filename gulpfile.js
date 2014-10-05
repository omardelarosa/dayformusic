var browserify    = require('browserify');
var gulp          = require('gulp');
var source        = require('vinyl-source-stream');
var buffer        = require('vinyl-buffer');
var uglify        = require('gulp-uglify');
var sourcemaps    = require('gulp-sourcemaps');
var exec          = require('child_process').exec;
var jade          = require('retro-gulp-jade');
var wrapCommonjs  = require('gulp-wrap-commonjs');
var plumber       = require('gulp-plumber');
var sass          = require('gulp-sass');
var concat        = require('gulp-concat');
var jshint        = require('gulp-jshint');
var stylish       = require('jshint-stylish');
var server        = require('./server');

'use strict';

gulp.task('default', [ 'watch' ]);

gulp.task('build', [ 'jade', 'lint', 'js', 'sass' ] )

var getBundleName = function () {
  var name = "bundle";
  return name + '.' + 'min';
};

gulp.task('js', function() {

  var bundler = browserify({
    entries: [ './src/js/index.js' ],
    debug: true
  });

  var bundle = function() {
    return bundler
      .bundle()
      .pipe(source(getBundleName() + '.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./public/'));
  };

  return bundle();
});

gulp.task('jade', function() {
  return gulp.src('./src/templates/**/*.jade')
    .pipe(jade({
      client: true,
      exports: true
    }))
    .pipe(gulp.dest('./src/templates/'))
});

gulp.task('lint', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
})

gulp.task('sass', function () {
    gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./public/'));
});


gulp.task('watch', function() {

  server.start()

  gulp.watch([ './src/scss/*.scss' ], [ 'sass' ])
  gulp.watch([ './src/**/*.js' ], [ 'js' ])
  gulp.watch([ './src/**/*.jade' ], [ 'jade' ])

})