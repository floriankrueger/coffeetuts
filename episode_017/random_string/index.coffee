RandomStringGenerator = (string_length) ->
  this.string_length = string_length || 6
   
RandomStringGenerator.prototype.generate = () ->
  
  chars = "abcdefghijklmnopqrstuvwxyz"
  randomstring = ''
  i = 0
  while i < this.string_length
    rnum = Math.floor Math.random() * chars.length
    randomstring += chars.substring rnum, rnum+1
    i++

  randomstring

module.exports.create = (string_length) ->
  new RandomStringGenerator(string_length)

module.exports._class = RandomStringGenerator