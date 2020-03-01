'use strict';

const { parallel } = require('gulp');

const copy = require('./copy');
const stylus = require('./stylus');

const assemble = parallel(
  copy,
  stylus,
);

module.exports = assemble;
