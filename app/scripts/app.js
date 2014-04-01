'use strict';

angular.module('angularJspracticesApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  // Cache templates.
  .run(function($templateCache,$http){
      $http.get('views/main.html', {cache:$templateCache});
      $http.get('views/about.html', {cache:$templateCache});
      $http.get('views/contact.html', {cache:$templateCache});
      $http.get('views/fragments/header.html', {cache:$templateCache});
      $http.get('views/fragments/footer.html', {cache:$templateCache});
  });