(function(){
  var app=angular.module('smsapp',['ui.router', 'angular-growl', 'smsapp.Manage', 'smsapp.Auth', 'smsapp.General', 'yaru22.angular-timeago']); 

  app.config(['$stateProvider','$httpProvider','$urlRouterProvider', function($stateProvider,$httpProvider,$urlRouterProvider){

    $stateProvider.state('base',{
      url:'/base',
      abstract: true,
      templateUrl:'app/manage/base.tpl.html',
      controller:'BaseController'
    })
    .state('dashboard',{
      url:'/dashboard',
      parent: 'base',
      module: 'private', 
      templateUrl:'app/manage/dashboard.tpl.html',
      controller:'DashboardController' 
    })
    .state('user',{
      url:'/user',
      parent: 'base',
      module: 'private', 
      templateUrl:'app/user/user.tpl.html',
      controller:'UserController' 
    })
    .state('sendmessage',{
      url:'/sendmessage',
      parent: 'base',
      module: 'private', 
      templateUrl:'app/message/sendmessage.tpl.html',
      controller:'SendMessageController' 
    })
    .state('viewmessages',{
      url:'/viewmessages',
      parent: 'base',
      module: 'private', 
      templateUrl:'app/message/viewmessages.tpl.html',
      controller:'ViewMessagesController' 
    })
    .state('login',{
      url:'/login',
      module: 'public', 
      templateUrl:'app/auth/login.tpl.html',
      controller:'LoginController' 
    });
    
    $urlRouterProvider.otherwise('/base/dashboard');

  }]);

  app.config(['$httpProvider', 'SessionServiceProvider', 'REST_BASE_URL',
    function($httpProvider, SessionServiceProvider, REST_BASE_URL) {

      var interceptor = [
        function() {
          return {
            request: function(config) {

              if (config.url.indexOf(REST_BASE_URL) > -1) {
                // Check if the localstorage has smsapp_session
                var smsapp_session = {};
                if (SessionServiceProvider.get('smsapp_session')) {
                  smsapp_session = SessionServiceProvider.get('smsapp_session');
                } else {
                  smsapp_session = null;
                }

                // Check if the token exists. If so, add it to the request header
                if (smsapp_session && smsapp_session.token) {
                  config.headers.Authorization = smsapp_session.token;
                }
              }
              return config;
            }
          };
        }
      ];

      $httpProvider.interceptors.push(interceptor);

    }
  ]);

  app.constant('REST_BASE_URL', 'http://messengerapi.rajnikantpanchal.com');
  // app.constant('REST_BASE_URL', 'http://localhost:1800');
  app.constant('S3_BASE_URL', 'https://s3.ap-south-1.amazonaws.com/sms-messenger-files');


  app.run(['$rootScope', '$state', 'SessionService', function($rootScope, $state, SessionService) {
    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
      if (toState.module === 'private' && !SessionService.get('smsapp_session')) {
        e.preventDefault();
        $state.go('login');
      }
      else if (toState.module === 'public' && SessionService.get('smsapp_session')) {
        e.preventDefault();
        $state.go('base.dashboard');
      }
    });
  }]);

  app.factory('NotifyService', ['growl', function(growl) {

    var _notifyError = function(_message) {
      growl.error(
        _message, {
          ttl: 5000
        }
      );
      return;
    };

    var _notifySuccess = function(_message) {
      growl.success(
        _message, {
          ttl: 3000
        }
      );
      return;
    };

    var _notifyWarning = function(_message) {
      growl.warning(
        _message, {
          ttl: 3000
        }
      );
      return;
    };

    var _notifyInfo = function(_message) {
      growl.info(
        _message, {
          ttl: 3000
        }
      );
      return;
    };

    var _defaultError = function() {
      _notifyError("Oops! An Error Occured while processing your Request");
      return;
    };


    var _internetError = function() {
      _notifyError("Unable to contact Server. Please Check your network connection.");
      return;
    };


    var _forceLogoutError = function() {
      _notifyError("Something went wrong. Please login again.");
      return;
    };


    var _processError = function(err) {
      if(!err || !err.data) {
        _internetError();
      } else if(err.data.msg) {
        _notifyError(err.data.msg);
      } else if(err.data) {
        _notifyError(err.data);
      }else if(err.message) {
        _notifyError(err.message);
      }
    };



    return {
      error: _notifyError,
      success: _notifySuccess,
      warning: _notifyWarning,
      info: _notifyInfo,
      defaultError: _defaultError,
      internetError: _internetError,
      forceLogoutError: _forceLogoutError,
      processError: _processError
    };


  }]);

})();
