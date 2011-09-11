(function() {
  var RandomStringGenerator;
  RandomStringGenerator = function(string_length) {
    return this.string_length = string_length || 6;
  };
  RandomStringGenerator.prototype.generate = function() {
    var chars, i, randomstring, rnum;
    chars = "abcdefghijklmnopqrstuvwxyz";
    randomstring = '';
    i = 0;
    while (i < this.string_length) {
      rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
      i++;
    }
    return randomstring;
  };
  module.exports.create = function(string_length) {
    return new RandomStringGenerator(string_length);
  };
}).call(this);
