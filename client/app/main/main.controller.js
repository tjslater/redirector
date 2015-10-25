'use strict';

angular.module('redirectorApp')
  .controller('MainCtrl', function ($scope, Auth, $state, Re, TestCases) {

    var userId = Auth.isLoggedIn() ? Auth.getCurrentUser()._id : false;

    $scope.description = "";
    $scope.existsInDB = false;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.Re = Re;


    if (TestCases.data){
      $scope.Re.testCases = TestCases.data;
      $scope.existsInDB = true;
      $scope.description = TestCases.description;
    }

    $scope.addTestCase = function () {
      Re.testCases.push(new Re.TestCase());
    };

    $scope.addTest = function ($index) {
      Re.testCases[$index].tests.push(new Re.Test());
    };

    $scope.removeTestCase = function ($index) {
      Re.testCases.splice($index, 1);
      if (!Re.testCases.length){
        $scope.addTestCase();
      }
    };

    $scope.removeTest = function ($parentIndex, $index) {
      Re.testCases[$parentIndex].tests.splice($index, 1);
    };

    $scope.testRegexes = function(){
      Re.api.testRegexes(Re.testCases).then(function(response){
        Re.testCases = response.data;
      });
    };

    $scope.saveRegexes = function(){
      Re.api.saveRegexes(userId, Re.testCases, $scope.description).then(function(response){
        $state.go('main', {id: response._id});
      });
    };

    $scope.updateRegexes = function(){
      Re.api.updateRegexes($state.params.id, Re.testCases, $scope.description).then(function(response){
        Re.testCases = response.data;
      })
    }

    $scope.deleteTestGroup = function() {
      Re.testCases = [new Re.TestCase()];
      Re.api.deleteTestGroup($state.params.id).then(function() {
        $state.go('main', {id: ""});
      });
    }


  });
