'use strict';

const del = require('del');

const clean = () => del(`./public`);

module.exports = clean;
