'use strict';

const { series } = require('gulp');

const assemble = require('./assemble.js');
const copy = require('./copy.js');
const serve = require('./serve.js');

const taskList = [copy, assemble];

if (process.env.NODE_ENV === 'development') {
  taskList.push(serve);
}

module.exports = series(...taskList);
