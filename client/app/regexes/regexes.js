'use strict';

angular.module('redirectorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('regexes', {
        url: '/regexes/:id',
        templateUrl: 'app/regexes/regexes.html',
        controller: 'RegexesCtrl',
        resolve: {
          TestGroups: function($http, $stateParams) {
            return $http.get('api/re2/getByUserId/' + $stateParams.id).then(function(response) {
              return response.data;
            });
          }
        }
      });
  });