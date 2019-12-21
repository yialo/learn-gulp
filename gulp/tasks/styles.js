const { src, dest } = require('gulp');
const debug = require('gulp-debug');
const gulpIf = require('gulp-if');
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const isProduction = (process.env.NODE_ENV === 'production');

const postcssPlugins = [autoprefixer];

const styles = () => src(`./src/stylus/index.styl`)
  .pipe(debug({ title: 'sourcemaps:init' }))
  .pipe(gulpIf(
      !isProduction,
      sourcemaps.init()
  ))
  .pipe(debug({ title: 'styles' }))
  .pipe(stylus())
  .pipe(debug({ title: 'postcss' }))
  .pipe(postcss(postcssPlugins))
  .pipe(debug({ title: 'sourcemaps:write' }))
  .pipe(gulpIf(
      !isProduction,
      sourcemaps.write('./')
  ))
  .pipe(debug({ title: 'dest' }))
  .pipe(dest(`./public/assets`));

styles.displayName = 'styles';

module.exports = styles;
