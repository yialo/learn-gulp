const { src, dest, lastRun } = require('gulp');
const debug = require('gulp-debug');

const copy = () => src(`./src/static/**/*.*`, { since: lastRun(copy) })
  .pipe(debug({ title: 'Copy:Dest' }))
  .pipe(dest(
      (file) => `./public` + (file.extname === `.html` ? `/pages` : `/assets`)
  ));

copy.displayName = 'copy';

module.exports = copy;
