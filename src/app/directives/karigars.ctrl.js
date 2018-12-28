(function(){
  var app = angular.module("smsapp");
  app.directive('karigars', function () {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        scope: {
          parentObj: "=",
          karigars: "="
        },
        templateUrl: 'app/directives/karigars.tpl.html',
        controller: ['$scope', 'GeneralService', 'NotifyService', function($scope, GeneralService, NotifyService){

          if($scope.parentObj.karigar_id) {
            $scope.selectedKarigar = {
              id: $scope.parentObj.karigar_id
            };
          }

          $scope.getAllKarigars = function() {
            GeneralService.getUsers({user_type: 1, limit: 500})
            .then(function(response){
              if(response.data.code=="SUCCESS"){
                $scope.karigars = response.data.data.users;
              }
              else{
                NotifyService.error("Cannot get Karigars! Please try again!");
              }
            })
            .catch(function(err){
              NotifyService.processError(err);
            });
          };

          $scope.initializeState = function() {

            $scope.getAllKarigars();

          };

          $scope.initializeState();

          $scope.setKarigar = function() {
            $scope.parentObj.karigar_id = $scope.selectedKarigar.id;
          };

        }],
        link: function ($scope, element, attrs) { } //DOM manipulation
    };
  });
})();
