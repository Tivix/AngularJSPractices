'use strict';

describe('Filter: palindrome', function () {

  // load the filter's module
  beforeEach(module('angularJspracticesApp'));

  // initialize a new instance of the filter before each test
  var palindrome;
  beforeEach(inject(function ($filter) {
    palindrome = $filter('palindrome');
  }));

  it('should return the input prefixed with "palindrome filter:"', function () {
    var text = 'angularjs';
    expect(palindrome(text)).toBe('palindrome filter: ' + text);
  });

});
