/**
 * Helper function to get size of collections
 *
 * @return     {Number}     length of collection
 */

Object.prototype.size = function() {
  var size = 0, key;
  for (key in this) {
    if (this.hasOwnProperty(key)) size++;
  }
  return size;
};