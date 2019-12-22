const { src, dest, lastRun, series, watch } = require('gulp');
const debug = require('gulp-debug');

const defineDest = (file) => `./public` + (file.extname === `.html` ? `/pages` : `/assets`);

const copyStaticAssets = () => (
  src(`./src/static/**/*.*`, { since: lastRun(copyStaticAssets) })
    .pipe(debug({ title: 'Copy:Dest' }))
    .pipe(dest(defineDest))
);

copyStaticAssets.displayName = 'copy: move assets';

const taskList = [copyStaticAssets];

const isProduction = require('../utils/is-production');

if (!isProduction) {
  const path = require('path');
  const del = require('del');

  const fileUnlinkHandler = (filepath) => {
    const extname = path.extname(filepath);
    let filePathInDest;

    if (extname === '.html') {
      const basename = path.basename(filepath);
      filePathInDest = path.resolve(`./public/pages`, basename);
    } else {
      const relativePathFromSrc = path.relative(path.resolve(`./src/static`), filepath);
      filePathInDest = path.resolve(`./public/assets`, relativePathFromSrc);
    }

    del.sync(filePathInDest);
  };

  const appendWatcher = (done) => {
    const watcher = watch(`./src/static/**/*.*`, series(copyStaticAssets));
    watcher.on('unlink', fileUnlinkHandler);
    done();
  };

  appendWatcher.displayName = 'copy: append watcher';

  taskList.push(appendWatcher);
}

const copy = series(...taskList);

module.exports = copy;
