'use strict';

const { series } = require('gulp');

const assemble = require('./assemble');

// TODO: add real 'serve' task
const serve = (done) => {
  console.log(`It's a stub for 'serve' task`);
  done();
};

const taskList = [assemble];

if (process.env.NODE_ENV === 'development') {
  taskList.push(serve);
}

module.exports = series(...taskList);
