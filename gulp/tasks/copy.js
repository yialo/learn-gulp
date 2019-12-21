const { src, dest } = require('gulp');

const copy = () => src(`./src/static/**/*.*`)
  .pipe(dest(
      (file) => `./public` + (file.extname === `.html` ? `/pages` : `/assets`)
  ));

copy.displayName = 'copy';

module.exports = copy;
