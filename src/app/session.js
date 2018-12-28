(function() {

  var app = angular.module('smsapp');

  app.provider('SessionService', function($localStorageProvider, $sessionStorageProvider) {

    var _get = function(key) {
      if (key) {
        return $localStorageProvider.get(key);
      } else {
        return $localStorageProvider;
      }
    };

    var _session_get = function(key) {
      if (key) {
        return $sessionStorageProvider.get(key);
      } else {
        return $sessionStorageProvider;
      }
    };

    var _set = function(key, value) {
      $localStorageProvider.set(key, value);
    };

    var _session_set = function(key, value) {
      $sessionStorageProvider.set(key, value);
    };

    var _delete = function(key) {
      $localStorageProvider.remove(key);
    };

    var _session_delete = function(key) {
      $sessionStorageProvider.remove(key);
    };

    return {
      get: _get,
      set: _set,
      delete: _delete,
      session_get: _session_get,
      session_set: _session_set,
      session_delete: _session_delete,
      $get: function() {
        return {
          get: _get,
          set: _set,
          delete: _delete,
          session_get: _session_get,
          session_set: _session_set,
          session_delete: _session_delete
        };
      }
    };
    
  });
})();
