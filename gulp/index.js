const assemble = require('./tasks/assemble');
const clean = require('./tasks/clean');
const copy = require('./tasks/copy');
const develop = require('./tasks/develop');
const observe = require('./tasks/observe');
const styles = require('./tasks/styles');

module.exports = {
  assemble,
  develop,
};
