var app = angular.module('app', ['ngLoadingSpinner','angularUtils.directives.dirPagination','ui.router']);
app.config(['$locationProvider','$anchorScrollProvider', function($locationProvider,$anchorScrollProvider){
    $locationProvider.html5Mode(true);    
    $anchorScrollProvider.disableAutoScrolling();
}]);



// app.controler('mainController',function mainController($scope, $http) {   
// });
app.config(function($interpolateProvider,paginationTemplateProvider,$stateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
  paginationTemplateProvider.setPath('/js/dirPagination.tpl.html');
  
  var indexState = {
    name: 'index',
    url: '/',
    templateUrl: 'partials/index.html'
  } 
  
  var animalState = {
    name: 'animal',
    url: '/animal',
    templateUrl: 'partials/animal.html'
  } 
  var cageState = {
    name: 'cage',
    url: '/cage',
    templateUrl: 'partials/cage.html'
  }
  var strainState = {
    name: 'strain',
    url: '/strain',
    templateUrl: 'partials/strain.html'
  }
  var eventState = {
    name: 'event',
    url: '/event',
    templateUrl: 'partials/event.html'
  }

  var logoutState = {
    name: 'logout',
    url: '/logout',
    controller: function($scope, $window) {
         $window.location.reload();
		}
  }


  $stateProvider.state(indexState);
  $stateProvider.state(animalState);
  $stateProvider.state(cageState);
  $stateProvider.state(strainState);
  $stateProvider.state(eventState);
  $stateProvider.state(logoutState);


});


//// Animal Controller Start
app.controller('animalCtrl', function($scope, $filter, $q, $http) {



    $scope.sortReverse = false;
    $scope.pageSize = 5;

  

    $http.get('/api/animals').success(function(data){
        // for(var i = 0 ; i < 5000 ; i++){
        //     var temp = angular.copy(data[0]);
        //     data.push(temp);
        // }
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
                                 $("#animalAdd").modal('hide');

                              });

                });
        
    };

    $scope.updateAnimal = function(a){
          $scope.editAnimal = a;
          $("#animalEdit").modal('show');
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
                                 $("#animalEdit").modal('hide');

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
                                 $scope.editAnimal = null;
                                 $('#animalEdit').modal('hide');
                              });

                });
    };

   

});
//// Animal Controller End







//// Cage Controller Start
app.controller('cageCtrl', function($scope, $filter, $q, $http,$rootScope,filterFilter) {
    

    $("#cageEdit").on('hide.bs.modal',function(){
        $scope.errors = [];
    });
    
    $http.get('/api/animals').success(function(data){
        $rootScope.animalsForCounting = data;
    });

     $scope.getCount = function(cageNo){
         
      return filterFilter( $rootScope.animalsForCounting, {cageNo:cageNo},true).length;
    }
    
   $rootScope.ui = {
       animalInCage : false,
       cage:true
   };

   $scope.errors=  [];

    $http.get('/api/cages').success(function(data){
        
        // for(var i = 0 ; i < 5000 ; i++){
        //             var temp = angular.copy(data[0]);
        //             data.push(temp);
        //         }

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
                                 $("#cageAdd").modal('hide');

                              });

                });
        
    };

    $scope.updateCage = function(c){
          $scope.$broadcast('loadAniamlInCage', c);
          $scope.editCage = c;
          $('#cageEdit').modal('show');
    };

    $scope.toggleAnimalInCage = function(c){
         $scope.$broadcast('updateCage', c);

    }

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
                                 $('#cageEdit').modal('hide');

                              });

                });

    };

    $scope.deleteCage = function(a){
        
        $scope.showError = false;

        if($rootScope.getSharedAnimal().length>0){
            $scope.errors.push({msg:'請先刪除或轉移籠子內的動物'});
            $scope.showError=true;
        }
        else{
            $http({ 
                            method :  'DELETE' , 
                            url :  '/api/cages' , 
                            data :  a, 
                            headers :  { 'Content-Type' :  'application/json' } 
                })
                .success(function(cage){
                             
                             $http.get('/api/cages').success(function(data){
                                 $scope.cages = data;
                                 $scope.editCage = null;
                                 $('#cageEdit').modal('hide');
                              });

                });
        }
        
    };

    $scope.openCam = function(c){
        window.open('http://'+c.ip+':8090?no='+c.no, "", "width=680,height=520");
    };
    $scope.turnOnCam = function(c){
        $http.get('http://'+c.ip+':8090'+'/on');
    };
    $scope.turnOffCam = function(c){
        $http.get('http://'+c.ip+':8090'+'/off');

    };
     
});
//// Cage Controller End

//// AnimalInCage Controller Start
app.controller('animalInCageCtrl', function($scope, $filter, $q, $http,$rootScope) {

     Array.prototype.getIndexBy = function (name, value) {  //// 這個function可以全部js用一次就好
  for (var i = 0; i < this.length; i++) {
  if (this[i][name] == value) {
  return i;
  }
  }
  return -1;
}

  $scope.sourceIndex = function (keyName, key) {

  var ix = $scope.animals.getIndexBy(keyName, key);
  return ix;

  }

//// 再把animals換成自己要選擇的object array的

  $scope.checkAll = function () {
  //only visible rows
  var boxes = document.getElementsByClassName("rowSelector");
  for (var bix=0; bix<boxes.length;bix++) {
  var ix = boxes[bix].value;
  $scope.animals[ix].isSelected = $scope.masterCheck;
  }
  }

  $scope.onPageChange = function(newPageNumber){

  $scope.masterCheck = false;
  for (var i in $scope.animals) {
  $scope.animals[i].isSelected = false;
  }

  };

    $rootScope.getSharedAnimal = function(){
        return $scope.animals;
    }
     
    
     $scope.$on('updateCage',function(event,cage){

         $rootScope.ui.animalInCage =true;
         $rootScope.ui.cage =false;

         $scope.cage = cage;
         $http.get('/api/animals?cageNo='+cage.no).success(function(data){
        // for(var i = 0 ; i < 5000 ; i++){
        //     var temp = angular.copy(data[0]);
        //     data.push(temp);
        // }
        $scope.animals = data;
        
       
        });
     });

      $scope.$on('loadAniamlInCage',function(event,cage){

         $http.get('/api/animals?cageNo='+cage.no).success(function(data){
       
        $scope.animals = data;
        
       
        });
     });

    $scope.sortReverse = false;
    $scope.pageSize = 5;

  

    

    $scope.addAnimal = function(){

        $scope.animal.cageNo = $scope.cage.no;

        $http({ 
                            method :  'POST' , 
                            url :  '/api/animals' , 
                            data :  $scope.animal, 
                            headers :  { 'Content-Type' :  'application/json' } 
                })
                .success(function(animal){

                    $http.get('/api/animals?cageNo='+$scope.cage.no).success(function(data){
                                 
                                 $scope.animals = data;
                                 $scope.animal = null;
                                 $("#animalInCageAdd").modal('hide');
                                  $http.get('/api/animals').success(function(data){
                                    $rootScope.animalsForCounting = data;
                                });
                    
                    });
                   

                });
        
    };

    $scope.updateAnimal = function(a){
          
          $scope.editAnimal = a;
          $('#cageAnimalEdit').modal('show');
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
                             $http.get('/api/animals?cageNo='+$scope.cage.no).success(function(data){
                                
                                $scope.animals = data;
                                $('#cageAnimalEdit').modal('hide');
                                
                                
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
                             $http.get('/api/animals?cageNo='+$scope.cage.no).success(function(data){
                                
                                $scope.animals = data;
                                 $scope.editAnimal = null;
                                 $('#cageAnimalEdit').modal('hide');
                                 $http.get('/api/animals').success(function(data){
                                    $rootScope.animalsForCounting = data;
                                });
                                
                            });
                            

                });
    };

   

});
//// AnimalInCage Controller End

//// Strains Controller Start
app.controller('strainCtrl', function($scope, $filter, $q, $http) {
    
    

    $http.get('/api/strains').success(function(data){
      $scope.strains = data;
    });

    $scope.addStrain = function(){

        $http({ 
                            method :  'POST' , 
                            url :  '/api/strains' , 
                            data :  $scope.strain, 
                            headers :  { 'Content-Type' :  'application/json' } 
                })
                .success(function(strain){

                   $http.get('/api/strains').success(function(data){
                                 $scope.strains = data;
                                 $scope.strain = null;
                                 $("#list").tab('show');

                              });

                });
        
    };

    $scope.updateStrain = function(c){
          $scope.editStrain = c;
          $('#edit').tab('show');
    };

    $scope.submitUpdateStrain = function(){
          
          $http({ 
                            method :  'PUT' , 
                            url :  '/api/strains' , 
                            data :  $scope.editStrain, 
                            headers :  { 'Content-Type' :  'application/json' } 
                })
                .success(function(strain){
                             $scope.editStrain = null;
                             $http.get('/api/strains').success(function(data){
                                 $scope.strains = data;
                                 $('#list').tab('show');

                              });

                });

    };

    $scope.deleteStrain = function(a){

        $http({ 
                            method :  'DELETE' , 
                            url :  '/api/strains' , 
                            data :  a, 
                            headers :  { 'Content-Type' :  'application/json' } 
                })
                .success(function(strain){
                             
                             $http.get('/api/strains').success(function(data){
                                 $scope.strains = data;
                                 $scope.editStrain = null;
                                 $('#list').tab('show');
                              });

                });
    };

   

});

////Strain Controller End



//// events Controller Start
app.controller('eventCtrl', function($scope, $filter, $q, $http) {
    
    

    $http.get('/api/events').success(function(data){
      $scope.events = data;
    });

    $scope.addEvent = function(){

        $http({ 
                            method :  'POST' , 
                            url :  '/api/events' , 
                            data :  $scope.event, 
                            headers :  { 'Content-Type' :  'application/json' } 
                })
                .success(function(event){

                   $http.get('/api/events').success(function(data){
                                 $scope.events = data;
                                 $scope.event = null;
                                 $("#list").tab('show');

                              });

                });
        
    };

    $scope.updateEvent = function(e){
          $scope.editEvent = e;
          $('#edit').tab('show');
    };

    $scope.submitUpdateEvent = function(){
          
          $http({ 
                            method :  'PUT' , 
                            url :  '/api/events' , 
                            data :  $scope.editEvent, 
                            headers :  { 'Content-Type' :  'application/json' } 
                })
                .success(function(event){
                             $scope.editEvent = null;
                             $http.get('/api/events').success(function(data){
                                 $scope.events = data;
                                 $('#list').tab('show');

                              });

                });

    };

    $scope.deleteEvent = function(e){

        $http({ 
                            method :  'DELETE' , 
                            url :  '/api/events' , 
                            data :  e, 
                            headers :  { 'Content-Type' :  'application/json' } 
                })
                .success(function(event){
                             
                             $http.get('/api/events').success(function(data){
                                 $scope.events = data;
                                  $scope.editEvent = null;
                                 $('#list').tab('show');
                                 
                              });

                });
    };

   

});

////Strain Controller End