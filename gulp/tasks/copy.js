const { src, dest } = require('gulp');

module.exports = () => src(`src/static/**/*.*`)
  .on('data', (file) => {
    console.log({
      path: file.path,
      base: file.base,
      relative: file.relative,
      stem: file.stem,
      extname: file.extname,
    });
  })
  .pipe(dest((file) => 'dist' + (file.extname === '.html' ? '/pages' : '')));
