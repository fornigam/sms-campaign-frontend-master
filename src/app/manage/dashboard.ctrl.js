(function(){
	var app = angular.module("smsapp.Manage");
	app.controller('DashboardController',['$scope','SessionService','$rootScope','NotifyService','$state', 'GeneralService',function($scope,SessionService,$rootScope,NotifyService,$state, GeneralService){

		console.log("Dash Controller");
		if($rootScope.force_logout === true){
			NotifyService.error("Session expired! Please login again!");
			$state.go('login');	
			SessionService.remove(); 
		}

		$scope.check = function(){
			PostService.getPost()
			.then(function(resp){

			})
			.catch(function(err){
				console.log("err-",err);
				NotifyService.processError(err);	
			});
		}

    $scope.search = {
      currentPage: 1,
      nextPage: 1,
      perPage: 1,
      totalCount: 1
    };

    $scope.searchWhere = {
      name: "",
      fathername: "",
      caste: "",
      village: "",
      mobile: ""
    };

    $scope.pageChanged = function() {
      $scope.getCustomers();  
    };

    $scope.getCustomers = function(page_reset) {
      if($scope.searchWhere.name==='' && $scope.searchWhere.fathername==='' && $scope.searchWhere.caste==='' && $scope.searchWhere.village==='' && $scope.searchWhere.mobile==='') {
        return;
      }
      if(page_reset) {
        $scope.search.currentPage = 1;
      }
      var filter_obj = {
        page: $scope.search.currentPage,
        name: $scope.searchWhere.name,
        fathername: $scope.searchWhere.fathername,
        caste: $scope.searchWhere.caste,
        village: $scope.searchWhere.village,
        mobile: $scope.searchWhere.mobile,
        limit: 100
      };
      console.log("filter_obj", filter_obj);
      GeneralService.getCustomers(filter_obj)
      .then(function(response){
        if(response.data.code=="SUCCESS"){
          $scope.customers = response.data.data.customers;
          $scope.search = response.data.data.meta.paginate;
        }
        else{
          NotifyService.error("Cannot get customers! Please try again!");
        }
      })
      .catch(function(err){
        NotifyService.processError(err);
      });
    };

    $scope.getCustomers(true);

    $scope.openCustomerDetails = function(customer) {
      $state.go('customerdetails', {id: customer.id});
    };

    $scope.deleteCustomer = function(customer) {
      if(confirm("Are you sure you want to delete Customer - " + customer.name + " - " + customer.fathername + " - " + customer.caste + " - " + customer.village + "? He will not be able to use the system anymore")) {
        GeneralService.deleteCustomer({id: customer.id})
        .then(function(response){
          if(response.data.code=="SUCCESS"){
            NotifyService.success("Customer deleted successfully!");
            $scope.getCustomers(true);
          }
          else{
            NotifyService.error("Cannot delete Customer! Please try again!");
            $scope.getCustomers(true);
          }
        })
        .catch(function(err){
          NotifyService.processError(err);
        });
      }
    };

	}]);
})();