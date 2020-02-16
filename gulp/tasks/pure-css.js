/**
 * NOTE:
 * Many-to-1 transformations
 * =========================
 * A particular case of 'many-to-many' transformations
 */

'use strict';

const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const debug = require('gulp-debug');
const gulpIf = require('gulp-if');
const isChanged = require('gulp-changed');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

const isProduction = require('../utils/is-production');

const SRC_PATH = `./src/css/*.css`;
const DEST_PATH = `./public/assets/css`;

const processCssFiles = () => (
  gulp.src(SRC_PATH)
    .pipe(debug({ title: 'CSS: from src' }))
    .pipe(gulpIf(!isProduction, sourcemaps.init()))
    .pipe(debug({ title: 'CSS: to postcss' }))
    .pipe(postcss([autoprefixer]))
    .pipe(debug({ title: 'CSS: to concat' }))
    .pipe(concat('all.css'))
    .pipe(gulpIf(
        isProduction,
        postcss([cssnano]),
        sourcemaps.write('./')
    ))
    .pipe(gulpIf(isProduction, rename('all.min.css')))
    // .pipe(debug({ title: 'CSS: to isChanged' }))
    // .pipe(isChanged(DEST_PATH, { hasChanged: isChanged.compareContents }))
    .pipe(debug({ title: 'CSS: to dest' }))
    .pipe(gulp.dest(DEST_PATH))
);

processCssFiles.displayName = 'pure css: process files';

const taskList = [processCssFiles];

if (!isProduction) {
  const appendWatcher = (done) => {
    gulp.watch(SRC_PATH, gulp.series(processCssFiles));
  };
  appendWatcher.displayName = 'pure css: append watcher';

  taskList.push(appendWatcher);
}

module.exports = gulp.series(...taskList);
