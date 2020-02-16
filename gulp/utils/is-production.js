'use strict';

// STUB:
process.env.NODE_ENV = 'development';

const { NODE_ENV = 'production'} = process.env;

console.log('NODE_ENV:', NODE_ENV);

module.exports = (NODE_ENV === 'production');
