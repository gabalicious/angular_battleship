angular.module('myApp', [
    'ui.router',
    'myApp.home',
    'myApp.create',
    'myApp.show',
    'myApp.all'

    ])
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app', {
        abstract: true
    })
    ;
    
    $urlRouterProvider.otherwise('/home');
})
;