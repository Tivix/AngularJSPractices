'use strict';

angular.module('angularJspracticesApp')
  .controller('MainCtrl', function ($scope, $modal) {
  	// Some example data for our page.
    $scope.now = new Date();
    $scope.price = 1001.92;
    $scope.message = "Hello World";
    // Video modal function
    $scope.videoWindow = function(){
      $modal.open({
        templateUrl: 'views/modals/video.html',
        controller: 'VideoModalCtrl'
      });
    }
  });

// Setup a controller for the modal used to display a video.
angular.module('angularJspracticesApp')
  .controller('VideoModalCtrl', function ($scope, $modalInstance) {
    // Handle OK button
    $scope.ok = function () {
        $modalInstance.close("OKAY");
    };
    // Handle cancel button
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
  });
