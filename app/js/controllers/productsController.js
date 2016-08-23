izettleApp.controller('productsController', ['productsService', 'productFactory', '$scope', 'Upload', function(productsService, productFactory, $scope, Upload) {
  var self = this;
  self.products = [];

  $scope.model = {
    selected: {}
  };

  // fetches all products from rails API
  productsService.fetchAll().then(function(products){
    self.products = products;
  });

  // gets the template to ng-include for a table row / item
  $scope.getTemplate = function (product) {
    if (product.id === $scope.model.selected.id) return 'edit';
    else return 'display';
  };

  $scope.editProduct = function (product) {
    $scope.model.selected = angular.copy(product);
  };

  $scope.updateProduct = function (idx) {
    self.products[idx] = angular.copy($scope.model.selected);
    self.saveUpdatedProduct(idx);
    $scope.reset();
  };

  $scope.reset = function () {
    $scope.model.selected = {};
  };

  $scope.deleteProduct = function (id) {
    var confirmation = window.confirm("Are you sure you want to delete this item?");
    if (confirmation)
    {
      self.deleteProduct(id);
      $scope.reset();
    }
  };

  self.imageBase64ToJSON = function(string){
    return JSON.parse(string).base64;
  }

  self.addProduct = function(productName, productPrice, productImage) {
    self.products.push(new productFactory(productName, productPrice, JSON.stringify(productImage)));
    self.saveProduct();
  };

  self.saveProduct = function(data) {
    var data = this.products.pop();
    productsService.sendToServer(data, 'POST').success(function(data, status) {
      productsService.fetchAll().then(function(products){
        self.products = products;
      });
    });
  };

  // Need to fix image uploads

  self.saveUpdatedProduct = function(idx) {
    var data = {
      "data": {
        "type": "products",
        "id": self.products[idx].id,
        "attributes": {
          "name":  self.products[idx].attributes.name,
          "price": self.products[idx].attributes.price,
          "image": self.products[idx].attributes.image = JSON.stringify(self.products[idx].attributes.image)
        }
      }
    }
    productsService.sendToServer(data, 'PUT').success(function(data, status) {
      productsService.fetchAll().then(function(products){
        self.products = products;
      });
    });
  };

  self.deleteProduct = function(id) {
    var data = {id: id};
    productsService.sendToServer(data, 'DELETE').success(function(data, status) {
      productsService.fetchAll().then(function(products){
        self.products = products;
      });
    });
  };


}]);
