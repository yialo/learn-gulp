'use strict';

const assemble = require('./tasks/assemble.js');
const clean = require('./tasks/clean.js');
const develop = require('./tasks/develop.js');
const text = require('./tasks/text.js');

const gulp = require('gulp');
const stylus = require('gulp-stylus');

gulp.task('styles:styl', () => {
  return gulp.src('./src/stylus/**/*.styl')
  .pipe(stylus())
  .pipe(gulp.dest('./public'));
});

module.exports = {
  assemble,
  clean,
  develop,
  text,
};
