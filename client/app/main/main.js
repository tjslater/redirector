'use strict';

angular.module('redirectorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/:id',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          TestCases: function ($stateParams, Re, $state) {
            if (!$stateParams.id){ return []; }
            return Re.api.getRegexes($stateParams.id).then(function(response){
              return response;
            }, function(){
              $state.go('main', {id: ''});
            });
          }
        }
      });
  });