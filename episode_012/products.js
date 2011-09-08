(function() {
  var products;
  products = [
    {
      id: 1,
      name: 'Mac Book Pro',
      description: 'Apple 13 inch Mac Book Pro',
      price: 1000
    }, {
      id: 2,
      name: 'iPad',
      description: 'Apple 64GB 3G iPad',
      price: 899
    }
  ];
  module.exports.all = products;
  module.exports.find = function(id) {
    var found, product, _i, _len;
    id = parseInt(id, 10);
    found = null;
    for (_i = 0, _len = products.length; _i < _len; _i++) {
      product = products[_i];
      if (product.id === id) {
        found = product;
      }
    }
    return found;
  };
  module.exports.set = function(id, product) {
    id = parseInt(id, 10);
    product.id = id;
    return products[id] = product;
  };
  module.exports["new"] = function() {
    return {
      name: '',
      description: '',
      price: 0
    };
  };
  module.exports.insert = function(product) {
    var id;
    id = products.length;
    product.id = id;
    products[id] = product;
    return id;
  };
}).call(this);
