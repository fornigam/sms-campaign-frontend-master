(function() {

  var smsapp = angular.module('smsapp.Auth');
  smsapp.factory('AuthDataService', ['BaseDataService', function(BaseDataService) {

    var _login = function(data) {
      var url = '/auth/login';
      return BaseDataService.http_post(url, data);
    };

    return {
      login: _login
    };

  }]);

})();