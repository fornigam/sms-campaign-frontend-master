(function(){
  var app = angular.module("smsapp.Manage");
  app.controller('ViewMessagesController',['$scope','SessionService','$rootScope','NotifyService','$state', 'GeneralService', 'Upload', 'REST_BASE_URL', 'S3_BASE_URL', '$modal',function($scope,SessionService,$rootScope,NotifyService,$state, GeneralService, Upload, REST_BASE_URL, S3_BASE_URL, $modal){

    $scope.pageChanged = function() {
      $scope.getMyMessages();  
    };

    if(SessionService.get('smsapp_session')) {
      $scope.current_user = SessionService.get('smsapp_session');
    }

    $scope.S3_BASE_URL = S3_BASE_URL;

    $scope.getMyMessages = function(page_reset) {
      if(page_reset) {
        $scope.search_messages.currentPage = 1;
      }
      GeneralService.getMyMessages({page: $scope.search_messages.currentPage, limit: $scope.search_messages.perPage})
      .then(function(response){
        if(response.data.code=="SUCCESS"){
          $scope.messages = response.data.data.messages;
          $scope.search_messages = response.data.data.meta.paginate;
          setTimeout(() => {
            $scope.$apply();
          }, 1000)
        }
        else{
          NotifyService.error("Cannot get your Messages! Please try again!");
        }
      })
      .catch(function(err){
        NotifyService.processError(err);
      });
    };

    $scope.selectedMessage = {};

    $scope.openNumbersModal = function(message) {
      $scope.selectedMessage = message;
      $scope.modalEditUser = $modal.open({
        animation: true,
        templateUrl: 'app/message/modals/numbersmodal.tpl.html',
        scope: $scope,
        size:'lg'
      });
      $scope.modalEditUser.result.then(function () {
      }, function () {

      });
    }

    $scope.initializeState = function() {

      $scope.search_messages = {
        currentPage: 1,
        nextPage: 1,
        perPage: 10,
        totalCount: 1
      };

      $scope.getMyMessages(true);

    };

    $scope.initializeState();
 

  }]);
})();