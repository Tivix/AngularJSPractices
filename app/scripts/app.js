'use strict';

// Here, we define our app/module.  The list following the
// name of the module represents all of the apps dependencies.
// Yeoman will include the first four based on your input in
// the generator wizard.  ui.bootstrap was added after the fact
// in order to give our app access to the AngularJS flavored
// bootstrap functions.
angular.module('angularJspracticesApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ($routeProvider) {
    // Here we define all of the app routes we'll support.
    $routeProvider
      // Home page
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      // About list view
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        resolve: {
          names: AboutCtrl.loadData
        }
      })
      // About details view.
      // Adding a section to the url prefixed with a colon
      // will indicate that this is a variable.  :who will
      // be replaced with someone's name.
      .when('/about/:who', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      // Our contact view.
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      // Our contact view.
      .when('/404', {
        templateUrl: '404.html',
        controller: 'MainCtrl'
      })
      // Our catch-all view.
      .otherwise({
        redirectTo: '/404'
      });
  })

  // Cache templates.  When the app loads, Angular will have the
  // browser make a series of requests for these files and store
  // then in the $templateCache service.
  .run(function($templateCache,$http){
      $http.get('views/main.html', {cache:$templateCache});
      $http.get('views/about.html', {cache:$templateCache});
      $http.get('views/contact.html', {cache:$templateCache});
      $http.get('views/fragments/header.html', {cache:$templateCache});
      $http.get('views/fragments/footer.html', {cache:$templateCache});
  });