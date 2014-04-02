'use strict';

var AboutCtrl = angular.module('angularJspracticesApp')
  .controller('AboutCtrl', function ($scope, $route) {
  	$scope.names = $route.current.locals.names;
  });

AboutCtrl.loadData = function(Request){
  return Request.sync({
    url: '/scripts/data/sample1.json',
    method: 'GET'
  });
};
