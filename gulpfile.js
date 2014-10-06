var browserify    = require('browserify')
  , gulp          = require('gulp')
  , source        = require('vinyl-source-stream')
  , buffer        = require('vinyl-buffer')
  , uglify        = require('gulp-uglify')
  , sourcemaps    = require('gulp-sourcemaps')
  , exec          = require('child_process').exec
  , jade          = require('retro-gulp-jade')
  , wrapCommonjs  = require('gulp-wrap-commonjs')
  , plumber       = require('gulp-plumber')
  , sass          = require('gulp-sass')
  , concat        = require('gulp-concat')
  , jshint        = require('gulp-jshint')
  , stylish       = require('jshint-stylish')
  , server        = require('./server');

'use strict';

gulp.task('default', [ 'watch' ]);
gulp.task('build', [ 'jade', 'lint', 'js', 'sass' ] )
gulp.task('heroku:production', [ 'build' ])

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

  gulp.watch([ './src/**/*.scss' ], [ 'sass' ])
  gulp.watch([ './src/**/*.js' ], [ 'js' ])
  gulp.watch([ './src/**/*.jade' ], [ 'jade' ])

})