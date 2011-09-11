(function() {
  var Schema, User, mongoose;
  mongoose = require('mongoose');
  Schema = mongoose.Schema;
  User = new Schema({
    login: {
      type: String,
      index: true
    },
    password: {
      type: String,
      index: true
    },
    role: String
  });
  User.statics.authenticate = function(login, password, callback) {
    return this.findOne({
      login: login,
      password: password
    }, function(err, doc) {
      return callback(doc);
    });
  };
  mongoose.model('User', User);
}).call(this);
