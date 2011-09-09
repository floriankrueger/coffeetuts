users = 
  'flo' : 
    login: 'flo'
    password: 'test1'
    role: 'admin'
  'john' :
    login: 'john'
    password: 'test2'
    role: 'user'

module.exports.authenticate = (login, password, callback) ->
  
  user = users[login]
  
  if not user
    callback null
    return
  
  if user.password == password
    callback user
    return

  callback null