const { src, dest, lastRun } = require('gulp');
const debug = require('gulp-debug');

const defineDest = (file) => `./public` + (file.extname === `.html` ? `/pages` : `/assets`);

const copy = () => (
  src(`./src/static/**/*.*`, { since: lastRun(copy) })
    .pipe(debug({ title: 'Copy:Dest' }))
    .pipe(dest(defineDest))
);

copy.displayName = 'copy';

module.exports = copy;
