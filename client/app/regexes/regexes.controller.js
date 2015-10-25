'use strict';

angular.module('redirectorApp')
  .controller('RegexesCtrl', function ($scope, Auth, User, TestGroups) {

    $scope.testGroups = TestGroups;

  });
