(function(){
  var app = angular.module("smsapp.General");
  app.controller('UserController', ['$scope', 'SessionService', '$rootScope', 'NotifyService', '$state', 'GeneralService', '$modal', function($scope, SessionService, $rootScope, NotifyService, $state, GeneralService, $modal){

    if(SessionService.get('smsapp_session').user_type!=0) {
      // Not a super admin. So redirect to Dashboard
      $state.go('dashboard');
    }

    $scope.pageChanged = function() {
      $scope.getUsers();  
    };

    $scope.getUsers = function(page_reset) {
      if(page_reset) {
        $scope.search_users.currentPage = 1;
      }
      GeneralService.getUsers({page: $scope.search_users.currentPage})
      .then(function(response){
        if(response.data.code=="SUCCESS"){
          $scope.users = response.data.data.users;
          $scope.search_users = response.data.data.meta.paginate;
        }
        else{
          NotifyService.error("Cannot get Users! Please try again!");
        }
      })
      .catch(function(err){
        NotifyService.processError(err);
      });
    };

    $scope.editUserModal = function(user) {
      $scope.editUser = angular.copy(user);
      $scope.editUser.user_type = "" + $scope.editUser.user_type + "";
      delete $scope.editUser.password;
      $scope.modalEditUser = $modal.open({
        animation: true,
        templateUrl: 'app/user/modals/edituser.tpl.html',
        scope: $scope,
        size:'md'
      });
      $scope.modalEditUser.result.then(function () {
      }, function () {

      });
    };

    $scope.creditUserModal = function(user) {
      $scope.creditUser = angular.copy(user);
      delete $scope.creditUser.password;
      GeneralService.getUserBalance({user_id: user.id})
      .then((response) => {
        if(response && response.data && response.data.status=='SUCCESS') {
          $scope.creditUser.current_balance = response.data.balance;
          $scope.modalCreditUser = $modal.open({
            animation: true,
            templateUrl: 'app/user/modals/credituser.tpl.html',
            scope: $scope,
            size:'md'
          });
          $scope.modalCreditUser.result.then(function () {
          }, function () {

          });
        }
        else {
          NotifyService.error('Failed to fetch current balance of user');  
        }
      })
      .catch((err) => {
        NotifyService.error('Failed to fetch current balance of user');
      });
    };

    $scope.saveUser = function() {
      if(!$scope.validateUser($scope.editUser)) {
        NotifyService.error('Invalid User Details. Please enter all details');
        return;
      }
      GeneralService.saveUser($scope.editUser)
      .then(function(response){
        if(response.data.code=="SUCCESS"){
          NotifyService.success("User saved successfully!");
          $scope.modalEditUser.close();
          $scope.initializeState();
        }
        else{
          NotifyService.error("Cannot save User! Please try again!");
          $scope.modalEditUser.close();
          $scope.initializeState();
        }
      })
      .catch(function(err){
        NotifyService.processError(err);
        $scope.modalEditUser.close();
        $scope.initializeState();
      });
    };

    $scope.rechargeCredit = function() {
      if($scope.recharge.amount<=0) {
        NotifyService.error('Please enter proper amount');
        return;
      }
      else {
        GeneralService.rechargeCredit({ amount: $scope.recharge.amount, user_id: $scope.creditUser.id })
        .then((response) => {
          if(response && response.data.status=='SUCCESS') {
            NotifyService.success('Recharge done successfully');
            $rootScope.getMyBalance();
            $scope.creditUser = undefined;
            $scope.recharge.amount = 0;
            $scope.modalCreditUser.close();
            $scope.initializeState();
          }
          else {
            NotifyService.error('Recharge failed. Try again');
          }
        })
        .catch((err) => {
          NotifyService.processError(err);
        });
      }
    };

    $scope.validateUser = function(user) {
      var finalBool = true;
      if(!user.fullname) {
        NotifyService.error('Please enter Full Name of User');
        finalBool = false;
      }
      if(!user.username) {
        NotifyService.error('Please enter Username of User');
        finalBool = false;
      }
      if(!user.password) {
        NotifyService.error('Please enter Password of User');
        finalBool = false;
      }
      return finalBool;
    }

    $scope.addUser = function() {
      if(!$scope.validateUser($scope.newUser)) {
        NotifyService.error('Invalid User Details. Please enter all details');
        return;
      }
      GeneralService.saveUser($scope.newUser)
      .then(function(response){
        if(response.data.code=="SUCCESS"){
          $scope.newUser = {
            fullname: "",
            username: "",
            password: "",
            user_type: "0",
            mobile: ""
          };
          NotifyService.success("User added successfully!");
          $scope.initializeState();
        }
        else{
          NotifyService.error("Cannot add User! Please try again!");
        }
      })
      .catch(function(err){
        NotifyService.processError(err);
      });
    };

    $scope.deleteUser = function(user) {
      if(confirm("Are you sure you want to delete user - " + user.fullname + "? He will not be able to use the system anymore")) {
        GeneralService.deleteUser({id: user.id})
        .then(function(response){
          if(response.data.code=="SUCCESS"){
            NotifyService.success("User deleted successfully!");
            $scope.initializeState();
          }
          else{
            NotifyService.error("Cannot delete User! Please try again!");
            $scope.initializeState();
          }
        })
        .catch(function(err){
          NotifyService.processError(err);
          $scope.initializeState();
        });
      }
    };

    $scope.initializeState = function() {
      
      $scope.newUser = {
        fullname: "",
        username: "",
        password: "",
        user_type: "0",
        mobile: ""
      };

      $scope.recharge = {
        amount: 0,
      };

      $scope.search_users = {
        currentPage: 1,
        nextPage: 1,
        perPage: 10,
        totalCount: 1
      };

      $scope.getUsers(true);

    };

    $scope.initializeState();
 
  }]);
})();