const { src, dest } = require('gulp');
const debug = require('gulp-debug');
const stylus = require('gulp-stylus');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const postcssPlugins = [autoprefixer];

module.exports = () => src(`./src/stylus/**/*.styl`)
  .pipe(debug({ title: 'styles' }))
  .pipe(stylus())
  .pipe(debug({ title: 'postcss' }))
  .pipe(postcss(postcssPlugins))
  .pipe(debug({ title: 'dest' }))
  .pipe(dest(`public/assets`));
