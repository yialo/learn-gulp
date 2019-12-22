const path = require('path');

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
  const appendWatcher = (done) => {
    watch(`./src/static/**/*.*`, series(copyStaticAssets));
    done();
  };

  appendWatcher.displayName = 'copy: append watcher';

  taskList.push(appendWatcher);
}

const copy = series(...taskList);

module.exports = copy;
