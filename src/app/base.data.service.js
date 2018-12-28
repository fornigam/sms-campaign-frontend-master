(function(){

  var smsapp = angular.module('smsapp');

  smsapp.factory('BaseDataService', ['REST_BASE_URL', '$http', 'UtilService', function(REST_BASE_URL, $http, UtilService){

    var _http_get = function(url, data) {
      var query_string = "";
      if(data) {
        query_string = UtilService.httpBuildQuery(data);
      }
      return $http.get(REST_BASE_URL + url + query_string);
    };

    var _http_post = function(url, data) {
      return $http.post(REST_BASE_URL + url, data);
    };

    return {
      http_get: _http_get,
      http_post: _http_post
    };

  }]);

})();
