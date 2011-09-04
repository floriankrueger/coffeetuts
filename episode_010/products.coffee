products = [
  id: 1
  name: 'Mac Book Pro'
  description: 'Apple 13 inch Mac Book Pro'
  price: 1000
,
  id: 2
  name: 'iPad'
  description: 'Apple 64GB 3G iPad'
  price: 899
]

module.exports.all = products

module.exports.find = (id) ->
  id = parseInt id, 10
  found = null
  for product in products
    if product.id is id
      found = product
  found