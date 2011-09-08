fs = require 'fs'

src_path = "#{__dirname}/static/upload/photos/"
module.exports.list = (callback) ->
  fs.readdir src_path, (err, files) ->
    ret_files = []
    for file in files
      do (file) ->
        ret_files.push "/upload/photos/#{file}"

    console.log ret_files

    callback err, ret_files