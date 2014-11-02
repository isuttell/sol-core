module.exports = function(grunt) {
  grunt.registerTask('test', [
    'jshint',
    'jscs',
    'jasmine_node'
  ]);
};
