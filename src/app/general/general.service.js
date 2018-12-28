(function() {

  var smsapp = angular.module('smsapp.General');
  smsapp.factory('GeneralService', ['GeneralDataService', function(GeneralDataService) {

    var _saveUser = function(data) {
      return GeneralDataService.saveUser(data);
    };

    var _getUsers = function(data) {
      return GeneralDataService.getUsers(data);
    };

    var _deleteUser = function(data) {
      return GeneralDataService.deleteUser(data);
    };

    var _createMessage = function(data) {
      return GeneralDataService.createMessage(data);
    };

    var _getMyMessages = function(data) {
      return GeneralDataService.getMyMessages(data);
    };

    var _getMyBalance = function(data) {
      return GeneralDataService.getMyBalance(data);
    };

    var _getUserBalance = function(data) {
      return GeneralDataService.getUserBalance(data);
    };

    var _rechargeCredit = function(data) {
      return GeneralDataService.rechargeCredit(data);
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