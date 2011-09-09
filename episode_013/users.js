(function() {
  var users;
  users = {
    'flo': {
      login: 'flo',
      password: 'test1',
      role: 'admin'
    },
    'john': {
      login: 'john',
      password: 'test2',
      role: 'user'
    }
  };
  module.exports.authenticate = function(login, password, callback) {
    var user;
    user = users[login];
    if (!user) {
      callback(null);
      return;
    }
    if (user.password === password) {
      callback(user);
      return;
    }
    return callback(null);
  };
}).call(this);
