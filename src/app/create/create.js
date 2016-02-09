
angular.module('myApp.create', [
    'ui.router'
        ])
.config(function ($stateProvider) {
    $stateProvider
    .state('create', {
        url: '/create',
        templateUrl: 'app/create/create.tmpl.html',
        controller: 'CreateCtrl as create'
    })
    ;
})
.controller('CreateCtrl', function ($scope) {
    var create = $scope;

    $scope.xArray = [
    'A',
    'B',
    'C',
    'D',
    'E'
    ];
    $scope.yArray = [
    '1',
    '2',
    '3',
    '4',
    '5'
    ];

    $scope.check = function(coordinate){
        $("input[type='checkbox'][name='"+coordinate+ "']").prop("checked", true);
    };
    $scope.uncheck = function(coordinate){
        $("input[type='checkbox'][name='"+coordinate+ "']").prop("checked", false);
    };

    $scope.selected = [];

    $scope.select = function(coordinates, $event){
        var checked = $event.target.checked;
        // keep track of coordinates checked
        if (checked === true) {
            this.selected.push(coordinates);

        }

        else{
            var index = this.selected.indexOf(coordinates);
            this.selected.splice(index,1);
        };
        //prevent more than 10 checkbox coordinates
        if ($scope.selected.length > 10) {
            $scope.selected.pop();
            $("input[type='checkbox'][name='"+coordinates+ "']").prop("checked", false);

        };
    }


    $scope.start = function($event, coordinates){
      $event.preventDefault();
      $.ajax({
          type: "POST",
          url: "http://0.0.0.0:3000/games",
          data: {"p1_coordinates": coordinates.join(","), "p2_coordinates": $scope.getRandomCoordinates().join(","), "p1_name": "Justin", "current_turn": 1, "status": "starting"},
          success: function(data){
            console.log(data);
            window.location.href = "#/games/" + data.id;

        },
        dataType: "json"
    });

  };




  $scope.getRandomCoordinates = function(){
   var randomCoordinates = [];
       //clone allCoordinates

       var allCoordinates = angular.copy($scope.allCoordinates);
        // define random array
        while(randomCoordinates.length < 10){
            var randomNum = Math.floor((Math.random() * allCoordinates.length));
            randomCoordinates.push(allCoordinates.splice(randomNum,1)[0]);
        }
        return randomCoordinates;

    };
    $scope.randomizeP1 = function(){
        var randomCoordinates =  $scope.getRandomCoordinates();

       //reset selected array 
       $scope.selected = [];

        // uncheck all
        $scope.allCoordinates.forEach((coordinate)=>{
            $scope.uncheck(coordinate);

        });

        // check random
        randomCoordinates.forEach((coordinate)=>{
            $scope.check(coordinate);
            $scope.selected.push(coordinate);


        });

    };



    $scope.buildCoordinates = function(){
        $scope.allCoordinates = [];

        $scope.xArray.forEach( (x)=> {
            $scope.yArray.forEach((y)=> {
               $scope.allCoordinates.push(x+y);
           });
        });

    };

    $scope.add =  function(coordinate){
        if ($scope.selected.length <10) {
            $scope.selected.push(coordinate);
            $scope.check(coordinate); 
        };

    }

    $scope.remove =  function(coordinate){
        $scope.selected.splice($scope.selected.indexOf(coordinate),1);

        $scope.uncheck(coordinate); 
    }

    $scope.init = function(){
        $scope.buildCoordinates(); 
    }
    $scope.init();

});
