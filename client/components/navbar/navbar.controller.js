'use strict';

angular.module('redirectorApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
      {
        'title': 'New Test Group',
        'link': '/',
        'show': true
      }, {
        'title': 'My Test Groups',
        'link': '/regexes/',
        'show': false
      }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;


    $scope.logout = function () {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function (route) {
      return route === $location.path();
    };
  });