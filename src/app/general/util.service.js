(function() {

  var smsapp = angular.module('smsapp.General');
  smsapp.factory('UtilService', [function() {
    
    var _httpBuildQuery = function(params) {

      if (typeof params === 'undefined' || typeof params !== 'object') {
        params = {};
        return params;
      }

      var query = '?';
      var index = 0;

      for (var i in params) {
        index++;
        var param = i;
        var value = params[i];
        if (index == 1) {
          query += param + '=' + value;
        } else {

          query += '&' + param + '=' + value;
        }

      }
      return query;
    };

    return {
      httpBuildQuery: _httpBuildQuery
    };

  }]);

})();