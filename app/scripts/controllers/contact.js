'use strict';

angular.module('angularJspracticesApp')
  .controller('ContactCtrl', function ($scope, $log, Validators, Request) {
    // Here we'll setup some containers and flags, right off the bat.
    // This represents our form model.  Each property will be mapped
    // to a form field.
    $scope.mymodel = {name:""};
    // This is our errors container, which will be used by the
    // validators service.
    $scope.errors = [];
    // The submitted flag will update the UI based on the state of the
    // submission.
    $scope.submitted = false;
    // The sending flag will indicate when to disable the submit button.
    $scope.sending = false;
    // Let's define a function to be triggered when the form is submitted.
    $scope.sendMessage = function(){
      // First things first, if there are any validation errors, post
      // messages back to the screen.
    	Validators.validate_form($scope.contactus,$scope.errors);
      // If the form is invalid, short-circuit it.
    	if($scope.contactus.$invalid){
        // Do not continue.
    		return false;
    	}
      // Setup a POST request that includes our model.
      // This will be stored as a promise.
      // NOTE: This will fail because you can't post to a file in the grunt
      // server.  It will return 404.  For the purposes of demonstration,
      // we will treat that result as a success result.
      var post_request = Request.sync({
        url: "/scripts/data/success.json",
        method: 'POST',
        data: $scope.mymodel
      });
      // The request has been sent, let's prevent the submit button from
      // being pressed again.
      $scope.sending = true;
      // Now let's figure out what to do with the promise once it's
      // fulfilled.
      post_request.then(function(data){
          // Success case! Set submitted flag and undo sending flag.
          $scope.submitted = true;
          $scope.sending = false;
          // Let's log this result.
          $log.info("Server fulfilled request with result " + data.result);
      },function(data){
          // Problem case! Set submitted flag and undo sending flag.
          $scope.submitted = true;  
          $scope.sending = false;   
          // Let's log this result.   
          $log.error("Oh geez.  Looks like there was a problem submitting this to the server.");
      });
    }
  });
