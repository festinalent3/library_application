izettleApp.factory('productFactory', function() {

  var Product = function(productName, productPrice, productImage){
    return this.data = {
      "data": {
        "type": "products",
        "attributes": {
          "name": productName,
          "price": productPrice,
          "image": productImage
        }
      }
    }
  };

  return Product;
});
