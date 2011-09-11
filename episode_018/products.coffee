mongoose = require 'mongoose'

Schema    = mongoose.Schema

Product = new Schema
  name        : String
  description : String
  photo       : String
  price       : Number 

Product.statics.all = (callback) ->
  this.find {} , (err, docs) ->
    callback docs

mongoose.model 'Product', Product

###
module.exports.find = (id) ->
  id = parseInt id, 10
  found = null
  for product in products
    if product.id is id
      found = product
  found

module.exports.set = (id, product) ->
  id = parseInt id, 10
  product.id = id
  products[id] = product

module.exports.new = () ->
  name: ''
  description: ''
  price: 0

module.exports.insert = (product) ->
  id = products.length
  product.id = id
  products[id] = product
  id
###