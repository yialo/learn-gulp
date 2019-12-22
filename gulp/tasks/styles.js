const { src, dest, series, watch } = require('gulp');
const debug = require('gulp-debug');
const gulpIf = require('gulp-if');
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');

const isProduction = require('../utils/is-production');

const postcssPlugins = [autoprefixer];

const processStyles = () => (
  src(`./src/stylus/index.styl`)
    .pipe(gulpIf(
        !isProduction,
        sourcemaps.init()
    ))
    .pipe(debug({ title: 'Styles:Stylus' }))
    .pipe(stylus())
    .pipe(postcss(postcssPlugins))
    .pipe(rename((path) => {
      path.basename = 'styles';
    }))
    .pipe(gulpIf(
      !isProduction,
      sourcemaps.write('./')
  ))
    .pipe(debug({ title: 'Styles:Dest' }))
    .pipe(dest(`./public/assets/css`))
);

processStyles.displayName = 'styles: process Stylus files';

const taskList = [processStyles];

if (!isProduction) {
  const appendWatcher = (done) => {
    watch(`./src/stylus/**/*.styl`, series(processStyles));
    done();
  };

  appendWatcher.displayName = 'styles: append watcher';

  taskList.push(appendWatcher);
}

const styles = series(...taskList);

module.exports = styles;
