'use strict';

const path = require('path');
const gulp = require('gulp');

const flatten = (vinylFile) => {
  vinylFile.base = path.dirname(vinylFile.path);
};

const copyTextFiles = () => {
  return gulp
    .src('./src/**/*.txt')
    .pipe(gulp.dest((file) => {
      flatten(file);
      return './public';
    }));
};

copyTextFiles.displayName = 'copy:txt:flatten';

module.exports = copyTextFiles;
