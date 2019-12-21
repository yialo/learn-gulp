const assemble = require('./tasks/assemble');
const clean = require('./tasks/clean');
const copy = require('./tasks/copy');
const develop = require('./tasks/develop');
const observe = requrie('./tasks/observe');
const styles = require('./tasks/styles');

module.exports = {
  assemble,
  clean,
  copy,
  develop,
  observe,
  styles,
};
