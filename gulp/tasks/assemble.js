const { parallel, series } = require('gulp');

// const clean = require('./clean');
const copy = require('./copy');
const styles = require('./styles');

const assemble = series(
    // clean,
    parallel(copy, styles),
);

assemble.displayName = 'assemble';

module.exports = assemble;
