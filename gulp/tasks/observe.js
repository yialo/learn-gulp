const { watch, series } = require('gulp');

const styles = require('./styles');
const copy = require('./copy');

const observe = () => {
  watch(`./src/static/**/*.*`, series(copy));
  watch(`./src/stylus/**/*.styl`, series(styles));
};

observe.displayName = 'observe';

module.exports = observe;
