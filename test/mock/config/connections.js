/**
 * Connection Settings
 */

module.exports = {

  localDisk: {
    adapter: 'sails-disk'
  },

  mongodb: {
    adapter: 'sails-mongo',
    host: 'localhost',
    database: 'sol'
  }

};
