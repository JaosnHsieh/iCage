var app = angular.module('app', ['ngLoadingSpinner']);
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
    
    
    $scope.autofill = function(){
          $scope.animal = {"customerId":"0101","animalNo":"1010","status":"10101","strainId":"010","strainNam":"10","strainCategory":"010","cageId":"10","cageNo":"010","sex":"10","weight":"010","memo":"010","resume":"10","iacuc":"010","birth":"01"};
    };


    $http.get('/api/animals').success(function(data){
      $scope.animals = data;
    });

    $scope.addAnimal = function(){

        $http({ 
                            method :  'POST' , 
                            url :  '/api/animals' , 
                            data :  $scope.animal, 
                            headers :  { 'Content-Type' :  'application/json' } 
                })
                .success(function(animal){

                   $http.get('/api/animals').success(function(data){
                                 $scope.animals = data;
                                 $scope.animal = null;
                                 $("#list").tab('show');

                              });

                });
        
    };

    $scope.updateAnimal = function(a){
          $scope.editAnimal = a;
          $('#edit').tab('show');
    };

    $scope.submitUpdateAnimal = function(a){
          
          $http({ 
                            method :  'PUT' , 
                            url :  '/api/animals' , 
                            data :  $scope.editAnimal, 
                            headers :  { 'Content-Type' :  'application/json' } 
                })
                .success(function(animal){
                             $scope.editAnimal = null;
                             $http.get('/api/animals').success(function(data){
                                 $scope.animals = data;
                                 $('#list').tab('show');

                              });

                });

    };

    $scope.deleteAnimal = function(a){

        $http({ 
                            method :  'DELETE' , 
                            url :  '/api/animals' , 
                            data :  a, 
                            headers :  { 'Content-Type' :  'application/json' } 
                })
                .success(function(animal){
                             
                             $http.get('/api/animals').success(function(data){
                                 $scope.animals = data;
                              });

                });
    };

   

});



app.controller('cageCtrl', function($scope, $filter, $q, $http) {
    
    

    $http.get('/api/cages').success(function(data){
      $scope.cages = data;
    });

    $scope.addCage = function(){

        $http({ 
                            method :  'POST' , 
                            url :  '/api/cages' , 
                            data :  $scope.cage, 
                            headers :  { 'Content-Type' :  'application/json' } 
                })
                .success(function(cage){

                   $http.get('/api/cages').success(function(data){
                                 $scope.cages = data;
                                 $scope.cage = null;
                                 $("#list").tab('show');

                              });

                });
        
    };

    $scope.updateCage = function(c){
          $scope.editCage = c;
          $('#edit').tab('show');
    };

    $scope.submitUpdatecage = function(){
          
          $http({ 
                            method :  'PUT' , 
                            url :  '/api/cages' , 
                            data :  $scope.editCage, 
                            headers :  { 'Content-Type' :  'application/json' } 
                })
                .success(function(cage){
                             $scope.editCage = null;
                             $http.get('/api/cages').success(function(data){
                                 $scope.cages = data;
                                 $('#list').tab('show');

                              });

                });

    };

    $scope.deleteCage = function(a){

        $http({ 
                            method :  'DELETE' , 
                            url :  '/api/cages' , 
                            data :  a, 
                            headers :  { 'Content-Type' :  'application/json' } 
                })
                .success(function(cage){
                             
                             $http.get('/api/cages').success(function(data){
                                 $scope.cages = data;
                              });

                });
    };

   

});