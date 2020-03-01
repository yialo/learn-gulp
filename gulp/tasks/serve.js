'use strict';

const browserSync = require('browser-sync');
const pathEnum = require('../utils/path-enum.js');

const serve = (done) => {
  const server = browserSync.create('Gulp DevServer');
  server.init({
    server: {
      baseDir: pathEnum.PUBLIC,
      index: 'pages/index.html'
    },
    port: 3000,
    notify: false,
    open: false,
  });
  done();
};

module.exports = serve;
