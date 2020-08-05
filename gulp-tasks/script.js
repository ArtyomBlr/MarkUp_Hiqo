const gulp = require('gulp');
const plumber = require('gulp-plumber');
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require('gulp-uglify');

module.exports = function js() {
  return gulp.src("src/scripts/**/*.js")
    .pipe(plumber())
    .pipe(uglify())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('build/scripts'))
}