const { parallel, series } = require('gulp');

const clean = require('./clean');
const copy = require('./copy');
const pureCss = require('./pure-css');
const stylus = require('./stylus');

const assemble = series(
    // clean,
    parallel(
        // copy,
        pureCss,
        // stylus,
    ),
);

assemble.displayName = 'assemble';

module.exports = assemble;
