const { src, dest } = require('gulp');
const stylus = require('gulp-stylus');

const config = require('./config.json');

const styles = () => (
  src(config.path.entry.stylus)
    .pipe(stylus())
    .pipe(dest(`./dist/app.css`))
);

module.exports = {
  styles,
};
