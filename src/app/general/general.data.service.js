(function() {

  var smsapp = angular.module('smsapp.General');
  smsapp.factory('GeneralDataService', ['BaseDataService', function(BaseDataService) {
    
    var _saveUser = function(data) {
      var url = '/user/saveUser';
      return BaseDataService.http_post(url, data);
    };

    var _getUsers = function(data) {
      var url = '/user/getUsers';
      return BaseDataService.http_get(url, data);
    };

    var _deleteUser = function(data) {
      var url = '/user/deleteUser';
      return BaseDataService.http_get(url, data);
    };

    var _createMessage = function(data) {
      var url = '/message/createMessage';
      return BaseDataService.http_post(url, data);
    };

    var _getMyMessages = function(data) {
      var url = '/message/getMyMessages';
      return BaseDataService.http_get(url, data);
    };

    var _getMyBalance = function(data) {
      var url = '/creditledger/getMyBalance';
      return BaseDataService.http_get(url, data);
    };

    var _getUserBalance = function(data) {
      var url = '/creditledger/getUserBalance';
      return BaseDataService.http_get(url, data);
    };

    var _rechargeCredit = function(data) {
      var url = '/creditledger/rechargeCredit';
      return BaseDataService.http_post(url, data);
    };

    return {
      saveUser: _saveUser,
      getUsers: _getUsers,
      deleteUser: _deleteUser,
      createMessage: _createMessage,
      getMyMessages: _getMyMessages,
      getMyBalance: _getMyBalance,
      getUserBalance: _getUserBalance,
      rechargeCredit: _rechargeCredit,
    };

  }]);

})();