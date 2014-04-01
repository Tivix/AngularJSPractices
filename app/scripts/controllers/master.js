'use strict';

angular.module('angularJspracticesApp')
  .controller('MasterCtrl', function ($scope, $location, $modal) {
    $scope.$on("$locationChangeStart", function(event){
      $scope.where = $location.path();
    });
    $scope.splendid = function(){
	  var splendid_modal = $modal.open({
        templateUrl: 'views/modals/splendid.html',
        controller: 'SplendidModalCtrl'
      });
    }
  });

// ProcessingModalCtrl is used to control the modal that appears while app is processing
angular.module('angularJspracticesApp')
  .controller('SplendidModalCtrl', function ($scope, $modalInstance) {
    $scope.ok = function () {
        $modalInstance.close();
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
  });

