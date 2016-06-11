var app = angular.module('app.directives', [])
// Check URL format
app.directive('urlCheck', function() {
  var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z]*\.com$/i;
  var URL_REGEXP = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
  return {
    require: 'ngModel',
    restrict: '',
    link: function(scope, elm, attrs, ctrl) {
      // only apply the validator if ngModel is present and Angular has added the email validator
      /*if (ctrl && ctrl.$validators.email) {

        // this will overwrite the default Angular email validator
        ctrl.$validators.email = function(modelValue) {
          return ctrl.$isEmpty(modelValue) || URL_REGEXP.test(modelValue);*/
        ctrl.$validators.urlCheck = function(val) {
                // Return true/false for valid/invalid
                // Val is the model value, the user input
                return val.match(URL_REGEXP);
            }
        }
        
  };
        
});