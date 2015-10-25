'use strict';
angular.module('redirectorApp')
  .factory('Re', function ($http, $state) {

    var testCaseIdx = -1;
    var placeholders = {
      re: "https?://www\\.google\\.([a-z.]{2,})/(intl/[^/]+/)?maps/(\\??.*)",
      loc: "https://www.google.$0/$1maps/streetview/$2",
      test: "https://www.google.com/maps/about/behind-the-scenes/streetview/"
    };

    function Test() {
      this.string = "";
      this.output = "";
      this.pass = false;
    }

    function TestCase() {
      this.re = "";
      this.newLocation = "";
      this.idx = ++testCaseIdx;
      this.tests = [new Test()];
    }

    function testRegexes(testCases) {
      return $http.post('api/re2', testCases).then(function (response) {
        return response;
      }, errorHandler_);
    }

    function getRegexes(id) {
      return $http.get('api/re2/' + id).then(function (response) {
        return response.data;
      });
    }

    function saveRegexes(userId, testCases, description) {
      return $http.post('api/re2/save', {
        data: testCases,
        userId: userId,
        description: description
      }).then(function (response) {
        return response.data;
      }, errorHandler_);
    }

    function updateRegexes(regexGroupId, testCases, description) {
      return $http.patch('api/re2/' + regexGroupId, {
        data: testCases,
        description: description
      }).then(function (response) {
        return response.data;
      }, errorHandler_);
    }

    function deleteTestGroup(regexGroupId) {
      return $http.delete('api/re2/' + regexGroupId).then(function (response) {
        return response.data;
      }, errorHandler_)
    }


    function errorHandler_(err) {
      console.error(err);
      return [];
    }

    return {

      api: {
        deleteTestGroup: deleteTestGroup,
        getRegexes: getRegexes,
        saveRegexes: saveRegexes,
        testRegexes: testRegexes,
        updateRegexes: updateRegexes,

      },
      testCases: [new TestCase()],
      Test: Test,
      TestCase: TestCase,
      placeholders: placeholders
    };

  });
