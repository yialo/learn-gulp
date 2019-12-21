const { src, dest } = require('gulp');
const stylus = require('gulp-stylus');

module.exports = () => src(`./src/stylus/index.styl`)
  .pipe(stylus())
  .pipe(dest(`dist`));
