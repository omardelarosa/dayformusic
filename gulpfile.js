var browserify  = require('browserify');
var gulp        = require('gulp');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var exec        = require('child_process').exec;
var jade        = require('gulp-jade');

'use strict';

gulp.task('default', function() {
  console.log("no op");
});

var getBundleName = function () {
  var version = require('./package.json').version;
  var name = "app";
  return name + '.' + 'min';
};

gulp.task('js', function() {

  var bundler = browserify({
    entries: [ './src/index.js' ],
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

gulp.task('templates', function() {
  gulp.src('./src/templates/**/*.jade')
    .pipe(jade({
      client: true
    }))
    .pipe(gulp.dest('./public/'))
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*.js', [ "js" ])
})