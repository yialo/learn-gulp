const { series } = require('gulp');

const clean = require('./clean');
const styles = require('./styles');

const assemble = series(clean, styles);

assemble.displayName = 'assemble';

module.exports = assemble;
