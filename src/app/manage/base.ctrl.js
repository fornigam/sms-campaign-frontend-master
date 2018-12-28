(function(){
	var app = angular.module("smsapp.Manage");
	app.controller('BaseController',['$scope','SessionService','$rootScope','NotifyService','$state', 'GeneralService',function($scope,SessionService,$rootScope,NotifyService,$state, GeneralService){
		
    $rootScope.user_balance = {
      balance: 0,
    };

		if(SessionService.get('smsapp_session')===undefined){
      $state.go('login');
    }
    else {
      $scope.user=SessionService.get('smsapp_session');
    }

    $rootScope.getMyBalance = function() {
      GeneralService.getMyBalance()
      .then((response) => {
        $rootScope.user_balance.balance = response.data.balance;
      })
      .catch((err) => {
        NotifyService.error('Failed to fetch balance');
      });
    };

    $rootScope.getMyBalance();

    $scope.logout = function() {
      SessionService.delete('smsapp_session');
      $state.go('login');
    };
 
	}]);
})();