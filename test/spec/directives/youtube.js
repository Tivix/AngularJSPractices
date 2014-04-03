'use strict';

describe('Directive: youtube', function () {

  // load the directive's module
  beforeEach(module('angularJspracticesApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<youtube></youtube>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the youtube directive');
  }));
});
