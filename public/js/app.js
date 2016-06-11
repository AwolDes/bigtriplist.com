var app = angular.module('travelListApp', ['mp.autoFocus', 'firebase','validation', 'validation.rule', 'app.controllers', 'app.factories', 'app.directives'])
    
    /*app.config(['$window', function($window) {
        $window.Stripe.setPublishableKey('pk_test_DLw0nHlXCtyWOqAOzk6OFrVU');
    }]);*/
    
    

app.controller("SampleCtrl", ["$scope", "Auth",
  function($scope, Auth) {
    $scope.auth = Auth;

    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
    });
  }]);
    
    
    
    



    
    
    
      

        

             
    



      

    


