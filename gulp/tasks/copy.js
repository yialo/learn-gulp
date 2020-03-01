/**
 * NOTE:
 * 1-to-1 transformations
 * ======================
 * It's good to use cache at the start of pipeline,
 * and we have to use manual 'unlink' handler in chokidar watcher
 * with sync file deletion and corresponding cache cleanup.
 */

'use strict';

const { src, dest, lastRun, series, watch } = require('gulp');
const cached = require('gulp-cached');
const debug = require('gulp-debug');

const getDest = (file) => {
  const isHtml = (file.extname === '.html');
  if (isHtml) {
    file.base += '/pages';
  }
  return `./public${isHtml ? '' : '/assets'}`;
};

const copyStaticAssets = () => {
  return src(`./src/static/**/*.*`)
    .pipe(debug({ title: 'Copy: from src' }))
    .pipe(cached('assetsCache'))
    .pipe(debug({ title: 'Copy: to dest' }))
    .pipe(dest(getDest));
};
copyStaticAssets.displayName = 'copy: move assets';

const taskList = [copyStaticAssets];
const isProduction = require('../utils/is-production');
if (!isProduction) {
  const path = require('path');
  const del = require('del');

  const fileDeleteHandler = (filepath) => {
    let filepathInDest;
    const extname = path.extname(filepath);

    if (extname === '.html') {
      const basename = path.basename(filepath);
      filepathInDest = path.resolve(`./public`, basename);
    } else {
      const relativePathFromSrc = path.relative(`./src/static`, filepath);
      filepathInDest = path.resolve(`./public/assets`, relativePathFromSrc);
    }

    del.sync(filepathInDest);
    const fullpath = path.resolve(filepath);
    delete cached.caches.assetsCache[fullpath];
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
