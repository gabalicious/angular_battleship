angular.module('myApp.home', [
    'ui.router'
    ])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'app/home/home.tmpl.html',
                controller: 'HomeCtrl as home'
            })
        ;
    })
    .controller('HomeCtrl', function () {
        var home = this;
        home.title = 'Home Page';
        home.body = 'This is the about home body';


    });
