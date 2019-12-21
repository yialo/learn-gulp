const { src, dest } = require('gulp');
const stylus = require('gulp-stylus');

const styles = () => (
  src(`./src/stylus/index.styl`)
    .pipe(stylus())
    .pipe(dest(`./dist/app.css`))
);

module.exports = {
  styles,
};
