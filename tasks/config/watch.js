/**
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 * ---------------------------------------------------------------
 *
 * Watch for changes on
 * and re-run the appropriate tasks.
 *
 * For usage docs see:
 *      https://github.com/gruntjs/grunt-contrib-watch
 *
 */
module.exports = function(grunt) {

  grunt.config.set('watch', {
    grunt: {

      // Reload Grunt config when we change it
      files: ['Gruntfile.js', 'tasks/**/*.js'],

      options: {
        reload: true
      }

    },

    sol: {

      // App files to watch:
      files: ['lib/**/*', "Sol.js", "test/specs/**/*.js", "test/helpers/**/*.js", "test/mock/**/*.js"],

      // When app changes run tests
      tasks: ['jshint:sol', 'jscs:sol', 'jasmine_node:sol'],

      options: {
        interrupt: true, // Interrupt any running tasks on save
        atBegin: true
      }
    }

  });
};
