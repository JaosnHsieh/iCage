var app = angular.module('app', []);
app.config(['$locationProvider', function($locationProvider){
    $locationProvider.html5Mode(true);    
}]);

// app.controler('mainController',function mainController($scope, $http) {   
// });
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});


app.controller('animalCtrl', function($scope, $filter, $q, $http) {
    
    $http.get('/api/animals').success(function(data){
      $scope.animals = data;
      console.log(123);
    });

    $scope.processForm = function(){

        $http({ 
                            method :  'POST' , 
                            url :  '/api/animals' , 
                            data :  $scope.animal, 
                            headers :  { 'Content-Type' :  'application/json' } 
                })
                .success(function(animal){
                             $("#list").tab('show');

                });
        
    };

    $scope.updateAnimal = function(a){
          $scope.editAnimal = a;
          $('#edit').tab('show');
    };

   

});