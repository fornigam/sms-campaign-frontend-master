// (function(){
//   var app=angular.module('loanapp.Models',['loanapp.Rest']);
//   console.log('loanapp.Models bootstrapped');
// })();

// (function(){
//   var app=angular.module('loanapp.Auth',['ui.router','angular-md5','ngStorage','loanapp.Models','loanapp.Ornament']);
//   console.log('loanapp.Auth bootstrapped');
// })();

// (function(){
//   var app=angular.module('loanapp.Manage',['loanapp.Models','ui.router','angularFileUpload','ngAnimate','ui.bootstrap','datatables','datatables.bootstrap','ngSanitize','omr.directives','ui-rangeSlider','ui.bootstrap.datetimepicker']);
// })();

// (function(){
//   var app=angular.module('loanapp.Ornament',['loanapp.Models','ui.router','angularFileUpload','ngAnimate','ui.bootstrap','datatables','datatables.bootstrap','ngSanitize','omr.directives','ui-rangeSlider','ui.bootstrap.datetimepicker']);
// })();

// (function(){
//   var app=angular.module('loanapp.Print',['loanapp.Models','ui.router','angularFileUpload','ngAnimate','ui.bootstrap','datatables','datatables.bootstrap','ngSanitize','omr.directives','ui-rangeSlider','ui.bootstrap.datetimepicker']);
// })();

// (function(){
//   var app=angular.module('loanapp.Villager',['loanapp.Models','ui.router']);
// })();

// (function(){
//   var app=angular.module('loanapp.Accounts',['loanapp.Models','ui.router']);
// })();

(function(){
  var app=angular.module('smsapp.Manage',['smsapp','ui.router', 'ngFileUpload']); 
})();

(function(){
  var app=angular.module('smsapp.General',['smsapp', 'ui.bootstrap', 'ngMap']); 
})();

(function(){
  var app=angular.module('smsapp.Auth',['ngStorage','ngCookies']); 
})();