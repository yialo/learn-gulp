const { src, dest } = require('gulp');
const stylus = require('gulp-stylus');

const styles = (done) => {
  src(`./src/stylus/index.styl`)
    .pipe(stylus())
    .pipe(dest('./dist/app.css'));

  done();
};

module.exports = {
  styles,
};
