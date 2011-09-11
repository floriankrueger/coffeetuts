mongoose  = require('mongoose')

Schema    = mongoose.Schema

User = new Schema
  login   : 
    type    : String
    index   : true
  password: 
    type    : String
    index   : true
  role    : String 

User.statics.authenticate = (login, password, callback) ->
  this.findOne
    login: login
    password: password
  , (err, doc) ->
    callback doc

mongoose.model 'User', User