(function() {
  module.exports.generate = function(string_length) {
    var chars, i, randomstring, rnum;
    if (string_length === 0) {
      string_length = 6;
    }
    chars = "abcdefghijklmnopqrstuvwxyz";
    randomstring = '';
    i = 0;
    while (i < string_length) {
      rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
      i++;
    }
    return randomstring;
  };
}).call(this);
