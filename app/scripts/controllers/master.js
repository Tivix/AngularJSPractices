'use strict';

// master.js is a controller that we've setup above the ng-view section
// of the page.  This means that this controller will be continuously 
// active for the lifetime of the app.  Each time we change routes, this
// one will persist.  It also means that all scope variables in master.js
// will be accessible in child controller.  We use this to manipulate
// elements that aren't related to the route - like the header and footer
// of the page.
angular.module('angularJspracticesApp')
  .controller('MasterCtrl', function ($scope, $location, $modal, $log, Validators) {
    // Let's setup a listener.  The event we want to listen for is 
    // $locationChangeStart.  This occurs when the user has changed routes
    // by clicking a link and activating a method that changes the route
    // for them.  Let's tell the controller what to do when this happens.
    $scope.$on("$locationChangeStart", function(event){
      // We're going to update the where variable with the new path.
      // This will be used in the header to mark the right link as active.
      $scope.where = $location.path();
    });
    // Let's expose some validation methods
    $scope.validate_field = function(name,form,errors){
      Validators.validate_field(name,form,errors);
    };    // Now we want to setup a method that invokes a modal window, and it
    // will be accessible to all child controllers.  Basically, every page
    // in the app can call this.
    $scope.splendid = function(){
      // We open the modal from the $modal service.  We provide a template
      // url to be used in the modal, and a controller to use.  We receive
      // an object that contains a promise that will be fulfilled when the 
      // modal window is closed.  In this example we also resolve the
      // where variable so that the modal has access to this information.
	    var splendid_modal = $modal.open({
        templateUrl: 'views/modals/splendid.html',
        controller: 'SplendidModalCtrl',
        resolve: {
          "where": function(){ return $scope.where; }
        }
      });
      // Let's tell the controller what to do when the promise is fulfilled.
      // NOTE: ui.bootstrap modals store the promise in the result property.
      splendid_modal.result.then(function(result){
        // Log an info level event indicating what the success value was.
        $log.info("The modal window was closed with a result of " + result);
      },function(result){
        // Log a warning level event indicating what the rejection value was.
        $log.warn("Looks like the modal window was cancelled with a result of " + (result || "none"));
      });
    }
  });

// ProcessingModalCtrl is used to control the modal that appears while app is processing.
// Notice that the variable where is being injected into this controller. It
// was configured as part of the resolve property when setting up the modal.
// You can make it accessible to the template by assigning it to the scope.
angular.module('angularJspracticesApp')
  .controller('SplendidModalCtrl', function ($scope, $modalInstance, where) {
    // Handle OK button
    $scope.ok = function () {
        $modalInstance.close("OKAY");
    };
    // Handle cancel button
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    // Assign the resolved where property to the scope.
    $scope.where = where;
  });

