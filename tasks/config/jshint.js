/**
 * Lint JS
 *
 * ---------------------------------------------------------------
 *
 * # dev task config
 * Lint JS Files
 *
 *
 * For usage docs see:
 *      https://github.com/gruntjs/grunt-contrib-jshint
 */
module.exports = function(grunt) {

  grunt.config.set('jshint', {
    options: {
      jshintrc: true
    },
    sol: {
      options: {
        node: true
      },
      files: {
        src: ['Sol.js', 'lib/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
};
