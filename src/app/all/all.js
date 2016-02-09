angular.module('myApp.all', [
    'ui.router'
        ])
.config(function ($stateProvider) {
    $stateProvider
    .state('all', {
        url: '/games',
        templateUrl: 'app/all/all.tmpl.html',
        controller: 'allCtrl as all'
    })
    ;
})
.controller('allCtrl', function ($scope, $http) {
    var all = this;
    $http.get('http://localhost:3000/games').
    success(function(data) {
        $scope.games = data;
        console.log($scope.games);
    });
})
;
