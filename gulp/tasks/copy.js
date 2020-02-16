'use strict';

const { src, dest, lastRun, series, watch } = require('gulp');
const debug = require('gulp-debug');
const isChanged = require('gulp-changed');

const getDest = ({ extname }) => (
  `./public/` + (extname === `.html` ? `pages` : `assets`)
);

const copyStaticAssets = (done) => {
  src(`./src/static/**/*.*`)
    .pipe(debug({ title: 'Copy: from src - to isChanged' }))
    .pipe(isChanged(getDest, { hasChanged: isChanged.compareContents }))
    .pipe(debug({ title: 'Copy: from isChanged - to dest' }))
    .pipe(dest(getDest));

  console.log('Copied!');
  done();
};
copyStaticAssets.displayName = 'copy: move assets';

const taskList = [copyStaticAssets];
const isProduction = require('../utils/is-production');
if (!isProduction) {
  const path = require('path');
  const del = require('del');

  const fileDeleteHandler = (filepath) => {
    let filePathInDest;
    const extname = path.extname(filepath);

    if (extname === '.html') {
      const basename = path.basename(filepath);
      filePathInDest = path.resolve(`./public/pages`, basename);
    } else {
      const relativePathFromSrc = path.relative(`./src/static`, filepath);
      filePathInDest = path.resolve(`./public/assets`, relativePathFromSrc);
    }

    del.sync(filePathInDest);
    console.log('Unlinked!');
  };

  const appendWatcher = (done) => {
    watch(`./src/static/**/*.*`, series(copyStaticAssets))
      .on('unlink', fileDeleteHandler);
    done();
  };
  appendWatcher.displayName = 'copy: append watcher';

  taskList.push(appendWatcher);
}

module.exports = series(...taskList);
