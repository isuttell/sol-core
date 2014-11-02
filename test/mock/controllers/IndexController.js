/**
 * IndexController
 *
 * Controls base routes
 */

module.exports = function(sol) {
  return {
    index: function (req, res) {
        return res.send("Hi there!");
    },
    projects: function (req, res) {
        return res.send("projects");
    }
  };
};
