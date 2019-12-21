const del = require('del');

const clean = () => del(`./public`);
clean.displayName = 'clean';

module.exports = clean;
