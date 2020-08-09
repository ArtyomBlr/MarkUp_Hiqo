const gulp = require('gulp');
const plumber = require('gulp-plumber');
// const babel = require("gulp-babel");
const babelify = require('babelify');
const sourcemaps = require("gulp-sourcemaps");
const uglify = require('gulp-uglify');
const browserify = require('gulp-browserify');

module.exports = function js() {
  return gulp.src("src/scripts/**/*.js")
    .pipe(plumber())
    .pipe(browserify({
      insertGlobals: true,
      transform: ['babelify'],
    }))
    .pipe(uglify())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('build/scripts'))
}
