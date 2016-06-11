var app = angular.module('app.controllers', [])

app.controller('TravelListController', function($scope, focus, $firebase, $location, Auth, $interval) {
    
        // The Firebase URL
        var fireRef = new Firebase('https://fiery-torch-5644.firebaseio.com');
        
        // Items Array
        var arrayRef = fireRef.child('items');
          $scope.travelItems = $firebase(arrayRef).$asArray();
        // Check auth on page load
        var authData = fireRef.getAuth();
            if (authData) {
                $scope.userState = true;
            }else{
                $scope.userState = false;
            };
        
        $scope.formMsg = "";
        
        $scope.update = $interval (function(){
            if ($scope.itemLink == ""){
                $scope.urlError = false;
            //console.log("Empty Link");
            }else{
                $scope.urlError = true;
            };    
            
        }, 100);
            
          // Find length of array to display the amount of items
          $scope.$watch('travelItems', function(){
            var total = 0;
            var remaining = 0;
            $scope.travelItems.forEach(function(item){
                total++;
            });
          });
        
        
            
        $scope.itemText = "";
        $scope.itemLink = "";
        $scope.itemCatergory = "Bags";

        // Add new item
        $scope.newItem = function() {
            // Focus the add-item field
            focus('add-item');
            // Check auth, if they arent logged in they can't add
            var authData = fireRef.getAuth();
                if (authData) {
                    $scope.userID = fireRef.getAuth().password.email;
                  
                }
            //if (authData){
                
                $scope.$watch('form.overwrittenEmail.$error.url-check', function(newValue, oldValue) {
        if (newValue !== oldValue) {
           
        }
    });
    
    if ($scope.itemText && $scope.itemLink != '') {
        if ($scope.itemText.length < 100){
            
            $scope.travelItems.$add({
                itemName: $scope.itemText,
                itemLink: $scope.itemLink,
                itemCatergory: $scope.itemCatergory
                //itemOwner: $scope.userID
            });
            
            $scope.msg="";
            
        }else{
            $scope.msg = "Too many charcaters";
        }


            $scope.itemText = "";
            $scope.itemLink = "";
            $scope.itemCatergory = "Bags";
    } else{
        
        $scope.msg = "Please enter all info";
                }
        /*}else{
            
            console.log("Not logged in!");
            $scope.msg = "Please log in";
        }*/
    };

    $scope.removeItem = function(item){
        $scope.travelItems.$remove(item);
    };
        
    $scope.msg = "";
    $scope.userEmail = "";
    $scope.userPassword = "";
        
    $scope.signupUser = function(){
        
        fireRef.createUser({
            email    : $scope.userEmail,
            password : $scope.userPassword
        }, function(error, userData) {
            if (error) {
                $scope.formMsg = "Enter details to Signup!";
              } else {
                  $scope.userState = true;
              }
            });    
            //$location.path("/submit");
            
        }
        
        $scope.existingUserEmail = "";
        $scope.existingUserPass = "";
    
        // Log in user
    $scope.userLogin = function() {
        fireRef.authWithPassword({
            email    : $scope.existingUserEmail,
            password : $scope.existingUserPass
        }, function(error, authData) {
                  
                if (error) {
                    
                    $scope.formMsg = "Failed to Log in!";
                  } else {
                   
                      $scope.userState = true;
                      $scope.existingUserEmail = "";
          $scope.existingUserPass = "";
                  }
                });
            
        };
    // Destroy the user session
    $scope.logoutUser = function(){    
        fireRef.unauth();
        $scope.userState = false;
    };
        
    $scope.urlError = false;
        
    $scope.emailPass = "";
        
    $scope.forgotPass = function(){
        fireRef.resetPassword({
            email: $scope.emailPass
        }, function(error) {
            if (error) {
                switch (error.code) {
                    case "INVALID_USER":
                        console.log("The specified user account does not exist.");
                    break;
                default:
                    console.log("Error resetting password:", error);
                }
              } else {
                console.log("Password reset email sent successfully!");
              }
            });  
            
        };
    
      }
    );