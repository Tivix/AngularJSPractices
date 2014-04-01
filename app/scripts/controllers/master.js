'use strict';

angular.module('angularJspracticesApp')
  .controller('MasterCtrl', function ($scope, $location) {
    $scope.$on("$locationChangeStart", function(event){
      $scope.where = $location.path();
    })
  });
