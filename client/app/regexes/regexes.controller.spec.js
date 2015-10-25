'use strict';

describe('Controller: RegexesCtrl', function () {

  // load the controller's module
  beforeEach(module('redirectorApp'));

  var RegexesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegexesCtrl = $controller('RegexesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
