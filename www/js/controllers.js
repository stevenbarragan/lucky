angular.module('luck.controllers', [])

.controller('navCtrl', ['$scope', '$state', function($scope, $state){
  $scope.goToConfig = function(){
    $state.go('config');
  }

  $scope.displayConfig = function(){
    return $state.current.name !== 'config';
  }
}])

.controller('ConfigCtrl', ['$scope', 'localstorage', '$state', function($scope, localstorage, $state){
  $scope.data = localstorage.getObject('user');
  $scope.saveConfig = function(){
    localstorage.setObject('user', $scope.data);
    $state.go('numbers');
  };
}])

.controller('NumberCtrl', ['$scope', 'localstorage', function($scope, localstorage){
  var lastString;
  $scope.data = localstorage.getObject('user');

  function toCode(string){
    return string.split('').reduce(function(prev, current){
      return prev + current.charCodeAt();
    }, 0);
  }

  function sum(string){
    return string.split('').reduce(function(prev, current){
      return prev + parseInt(current)
    }, 0);
  }

  function sumString(string){
    do{
      string = sum(string.toString());
    } while(string > 9);

    return string;
  }

  function serie(first){
    var number, curent,
    last = first,
    numbers = [first];

    for(var i = 0; i < 4; i += 1){
      current = numbers[numbers.length - 1]
      number = last + current;
      last = current;
      numbers.push(number);
    }

    return numbers;
  }

  function buildString(){
    var name = toCode($scope.data.name),
    date = toCode($scope.data.date),
    today = toCode((new Date()).toDateString());
    return name + date + today;
  }

  $scope.luckyNumbers = function(){
    var string = buildString(),
    first_number = sumString(string);
    return serie(first_number);
  };
}]);
