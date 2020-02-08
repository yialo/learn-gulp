'use strict';

const { series } = require('gulp');

const assemble = require('./assemble');

// TODO: add real 'serve' task
const serve = (done) => {
  console.log(`It's a stub for 'serve' task`);
  done();
};

const develop = series(assemble, serve);

module.exports = develop;
