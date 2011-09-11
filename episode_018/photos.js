(function() {
  var fs, src_path;
  fs = require('fs');
  src_path = "" + __dirname + "/static/upload/photos/";
  module.exports.list = function(callback) {
    return fs.readdir(src_path, function(err, files) {
      var file, ret_files, _fn, _i, _len;
      ret_files = [];
      _fn = function(file) {
        return ret_files.push("/upload/photos/" + file);
      };
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        _fn(file);
      }
      console.log(ret_files);
      return callback(err, ret_files);
    });
  };
}).call(this);
