izettleApp.service('productsService', ['$http', function($http) {
  var self = this;

  self.fetchAll = function() {
    return $http.get('https://izettle-test-api.herokuapp.com/products')
    .then(_handleResponseFromApi);
  };

  function _handleResponseFromApi (response) {
    return response.data.data
  };

  self.sendToServer = function(data, method) {
    return $http({
      url: 'https://izettle-test-api.herokuapp.com/products',
      method: method,
      data: data,
      headers: {
        "Content-Type": "application/vnd.api+json",
        "Accept": "application/vnd.api+json"
      }
    })
  };
}]);
