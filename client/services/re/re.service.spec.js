'use strict';

describe('Service: re', function () {

  // load the service's module
  beforeEach(module('redirectorApp'));

  // instantiate service
  var re;
  beforeEach(inject(function (_re_) {
    re = _re_;
  }));

  it('should do something', function () {
    expect(!!re).toBe(true);
  });

});
