const { src, dest } = require('gulp');
const stylus = require('gulp-stylus');
const debug = require('gulp-debug');

module.exports = () => src(`./src/stylus/index.styl`)
  .pipe(debug({ title: 'styles' }))
  .pipe(stylus())
  .pipe(debug({ title: 'dest' }))
  .pipe(dest(`public/assets`));
