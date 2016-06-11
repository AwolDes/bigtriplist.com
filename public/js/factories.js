var app = angular.module('app.factories', [])

app.factory("Auth", ["$firebaseAuth",
          function($firebaseAuth) {
            var ref = new Firebase("https://fiery-torch-5644.firebaseio.com");
            return $firebaseAuth(ref);
          }
        ]);

// Focuses to the input of the item after submitting

app.factory('focus', function($timeout, $window) {
    return function(id) {
      // timeout makes sure that is invoked after any other event has been triggered.
      // e.g. click events that need to run before the focus or
      // inputs elements that are in a disabled state but are enabled when those events
      // are triggered.
      $timeout(function() {
        var element = $window.document.getElementById(id);
        if(element)
          element.focus();
      });
    };
  })