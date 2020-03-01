'use strict';

const path = require('path');

const rootPath = path.join(__dirname, '../../');

module.exports = {
  ROOT: rootPath,
  SRC: path.join(rootPath, 'src'),
  PUBLIC: path.join(rootPath, 'public'),
};
