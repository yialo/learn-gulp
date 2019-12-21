const { src, dest } = require('gulp');

module.exports = () => src(`./src/static/**/*.*`)
  .on('data', (file) => {
    console.log({
      path: file.path,
      base: file.base,
    });
  })
  .pipe(dest((file) => `./public` + (file.extname === `.html` ? `/pages` : `/assets`)));
