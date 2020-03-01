'use strict';

const browserSync = require('browser-sync');
const pathEnum = require('../utils/path-enum.js');

const server = browserSync.create('Gulp DevServer');

const serve = (done) => {
  server.init({
    server: {
      baseDir: pathEnum.PUBLIC,
    },
    notify: true,
    port: 3000,
    open: false,
  });
  server.watch(pathEnum.PUBLIC).on('change', server.reload);
  done();
};

module.exports = serve;
