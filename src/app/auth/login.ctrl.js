(function(){
	var app = angular.module("smsapp.Auth");
	app.controller('LoginController',['$scope','$rootScope','AuthService','NotifyService','$state','SessionService','$cookies',function($scope,$rootScope,AuthService,NotifyService,$state,SessionService,$cookies){

		console.log("Login Controller");

		// if($rootScope.force_logout === true){
		// 	NotifyService.error("Session expired! Please login again!");
		// 	SessionService.remove(); 
		// } 

		$scope.user = {
			username: "",
			password: ""
		}

		$scope.login = function(){ 
			if($scope.user.username==""){
				NotifyService.error("Please enter username");
				return;
			}
			if($scope.user.password==""){
				NotifyService.error("Please enter password");
				return;
			}
			AuthService.login($scope.user)
			.then(function(response){
				console.log("response-",response);
				if(response.data.code=="SUCCESS"){
					// Logged in Successfully
					SessionService.set("smsapp_session", response.data.data);
      		$state.go('dashboard');
					NotifyService.success("Logged in successfully!");
        }
        else{
          NotifyService.error("Something is not right! Please try again!");
				}
			})
			.catch(function(err){
        console.log("err", err);
				NotifyService.processError(err);
			});
		}

	}]);
})();