const { watch, series } = require('gulp');

const styles = require('./styles');

const observe = watch(`./src/stylus/**/*.styl`, series(styles))

observe.displayName = 'observe';

module.exports = observe;
