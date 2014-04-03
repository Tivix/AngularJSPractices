'use strict';

angular.module('angularJspracticesApp')
  .controller('MainCtrl', function ($scope) {
  	// Some example data for our page.
    $scope.now = new Date();
    $scope.price = 1001.92;
    $scope.message = "Hello World";
  });
