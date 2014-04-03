'use strict';

angular.module('angularJspracticesApp')
  .filter('reverse', function () {
    return function (input) {
      return input.split('').reverse().join('');
    };
  });
