const { src, dest } = require('gulp');
const debug = require('gulp-debug');
const gulpIf = require('gulp-if');
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');

const isProduction = (process.env.NODE_ENV === 'production');

const postcssPlugins = [autoprefixer];

const styles = () => src(`./src/stylus/index.styl`)
  .pipe(gulpIf(
      !isProduction,
      sourcemaps.init()
  ))
  .pipe(debug({ title: 'Styles:Stylus' }))
  .pipe(stylus())
  .pipe(postcss(postcssPlugins))
  .pipe(gulpIf(
      !isProduction,
      sourcemaps.write('./')
  ))
  .pipe(rename('styles.css'))
  .pipe(debug({ title: 'Styles:Dest' }))
  .pipe(dest(`./public/assets/css`));

styles.displayName = 'styles';

module.exports = styles;
