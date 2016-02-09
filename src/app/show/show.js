angular.module('myApp.show', [
    'ui.router'
    ])
.config(function ($stateProvider) {
    $stateProvider
    .state('games/:id', {
        url: '/games/:id',
        templateUrl: 'app/show/show.tmpl.html',
        controller: 'ShowCtrl as show'
    })
    ;
})
.controller('ShowCtrl', function ($scope, $http, $stateParams) {
    var show = $scope;
    show.id = $stateParams.id;
    show.xArray = [
    'A',
    'B',
    'C',
    'D',
    'E'
    ];
    show.yArray = [
    '1',
    '2',
    '3',
    '4',
    '5'
    ];
    show.size = 55;

    function updateGame(data){
        show.game = data.game;
        show.moves = data.moves;

        show.lastMove = data.moves[data.moves.length-1];
        if (show.moves) {
            show.p1_selected = data.p1_selected;
            show.p2_selected = data.p2_selected;

            show.p1_hits = data.p1_hits;
            show.p2_hits = data.p2_hits;
            show.p1_misses = data.p1_misses;
            show.p2_misses = data.p2_misses;
            show.remaining_p1_coordinates = data.remaining_p1_coordinates;
            show.remaining_p2_coordinates = data.remaining_p2_coordinates;
            // show.availableTargets = null;
            show.p1_remaining_ships = data.p1_remaining_ships;
            show.p2_remaining_ships = data.p2_remaining_ships;

        };
        // Ui Helpers
        show.isMyCoordinate = function(coordinate){
            return show.game.p1_coordinates.includes(coordinate);
        };


        show.isCoorinatePlayed = function(coordinate){
            return !(show.p1_selected.toString().includes(coordinate));


        };


        show.isCoorinateHit = function(coordinate, player){

            var hits = (player == "p1")
            ? show.p1_hits 
            : show.p2_hits;
            return hits.toString().includes(coordinate);

        };

        show.isCoorinateMissed = function(coordinate, player){
            var misses = (player == "p1")
            ? show.p1_misses 
            : show.p2_misses;

            return misses.toString().includes(coordinate);
        };

        show.isEmpty = function(coordinate, player){
            var remaining = (player == "p1")
            ? show.remaining_p2_coordinates 
            : show.remaining_p1_coordinates;

            return remaining.toString().includes(coordinate);
        };

        show.isShip = function(coordinate){

            return show.p1_remaining_ships.toString().includes(coordinate);
        };

        show.p1Turn = function(){
            var lastTurn = show.moves[show.moves.length - 1]
            var result =( show.moves.length == 0 || (lastTurn["player"] == "p1" && show.isCoorinateHit(lastTurn["move"],"p1") ) || (lastTurn["player"] == "p2" && show.isCoorinateMissed(lastTurn["move"],"p2") ) );
            return result;
        };

        show.p2Turn = function(){
            var result = !(show.p1Turn());

            return !(show.p1Turn());

        };

        show.notGameOver = function(){
            return (show.p1_remaining_ships.length != 0 && show.p2_remaining_ships != 0);
        };

        show.gameOver = function(){
            return !show.notGameOver();
        };

        show.player1Wins = function(){
            return show.p2_remaining_ships == 0;
        }

        show.player2Wins = function(){
            return show.p1_remaining_ships.length == 0;
        }

        show.timeGo = function()

        {
           if (show.p2Turn() && (show.p1_remaining_ships.length != 0 && show.p2_remaining_ships != 0)) {
            console.log("p2 go");

            window.setTimeout(function(){
                show.randomGo("p2");
            }, 3000);
            return true;  
        };
        return false
    };

    show.shootingPercentage = function(player){
        var percentage = (player == "p1") 
        ? (show.p1_hits.length/show.p1_selected.length)*100 
        : (show.p2_hits.length/show.p2_selected.length)*100;
        var result = isNaN(percentage) ? 0 : Math.round(percentage*100)/100
        return result;
    }; 




    show.timeGo();

};




$http.get("http://0.0.0.0:3000/games/"+show.id)
.success(function(data) {
    updateGame(data,show);

});

show.playerGo = function(player, coordinate){
    $http({
        method: 'PUT',
        url: 'http://0.0.0.0:3000/games/' + show.id,
        data: {player: player, move: coordinate}
    })
    .then(function successCallback(response) {
        updateGame(response.data);
        console.log(show["remaining_p1_coordinates"].length);

    }, function errorCallback(response) {

    });
};
show.movesFilter = function(moves, player){
    return _.filter(moves, {"player": player});
};
show.randomGo = function(player){
    var remaining_coordinates = (player == "p1")
    ? "remaining_p1_coordinates"
    : "remaining_p2_coordinates"
    var randomNum = Math.floor((Math.random() * show[remaining_coordinates].length));
    var coordinate =  show[remaining_coordinates][randomNum];
    console.log(show[remaining_coordinates].length);
    show.playerGo(player, coordinate);
};



    // true for hit false for miss
    show.HitorMissFilter = function(moves, choice, opponent){
       var results = _.filter(moves, function(turn) { return show.game[opponent].includes(turn.move) });
       //multi line ternary
       var results = choice
       ? _.filter(moves, function(turn) { return show.game[opponent].includes(turn.move) })
       : _.filter(moves, function(turn) { return !(show.game[opponent].includes(turn.move)) });
       return results;
   };   


});
