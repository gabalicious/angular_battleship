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
    });

    $scope.delete = function(game_id, $event){
        window.confirm("Are you sure?") ?
        (function(){
           $event.preventDefault();
           $http.delete('http://localhost:3000/games/' + game_id ).
           success(function(data) {
            var targetEl = "#game" + game_id;
            $(targetEl).addClass("animated fadeOutRightBig");
            $scope.games = data; 

        });
       })() :
       console.log("Cancel was pressed");
       
   };
});
