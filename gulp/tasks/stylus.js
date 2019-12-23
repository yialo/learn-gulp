const { src, dest, series, watch } = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const debug = require('gulp-debug');
const gulpIf = require('gulp-if');
const isChanged = require('gulp-changed');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const stylusProcessor = require('gulp-stylus');

const isProduction = require('../utils/is-production');

const DEST_PATH = `./public/assets/css`;

const processStylusFiles = () => (
  src(`./src/stylus/*.styl`)
    .pipe(gulpIf(!isProduction, sourcemaps.init()))
    .pipe(debug({ title: 'Stylus:Processor' }))
    .pipe(stylusProcessor())
    .pipe(postcss([autoprefixer]))
    .pipe(gulpIf(
        isProduction,
        postcss([cssnano]),
        sourcemaps.write('./')
    ))
    .pipe(gulpIf(isProduction, rename((path) => {
      path.basename += '.min';
    })))
    .pipe(debug({ title: 'Stylus:IsChanged?' }))
    .pipe(isChanged(DEST_PATH, { hasChanged: isChanged.compareContents }))
    .pipe(debug({ title: 'Stylus:Dest' }))
    .pipe(dest(DEST_PATH))
);

processStylusFiles.displayName = 'stylus: process files';

const taskList = [processStylusFiles];

if (!isProduction) {
  const path = require('path');

  const appendWatcher = (done) => {
    watch(`./src/stylus/**/*.styl`, series(processStylusFiles));
    done();
  };

  appendWatcher.displayName = 'stylus: append watcher';

  taskList.push(appendWatcher);
}

module.exports = series(...taskList);
