(function() {

  var smsapp = angular.module('smsapp.Auth');
  smsapp.factory('AuthService', ['AuthDataService', function(AuthDataService) {
    
    var _login = function(data) {
      return AuthDataService.login(data);
    };

    return {
      login: _login
    };

  }]);

})();