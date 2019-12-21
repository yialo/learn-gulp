const { series } = require('gulp');

const assemble = require('./assemble');
const observe = require('./observe');

const develop = series(assemble, observe);

develop.displayName = 'develop';

module.exports = develop;
