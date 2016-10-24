var app = angular.module('app', ['ngLoadingSpinner', 'angularUtils.directives.dirPagination', 'ui.router', 'chart.js','angular.filter']);
app.config(['$locationProvider', '$anchorScrollProvider', function ($locationProvider, $anchorScrollProvider) {
    $locationProvider.html5Mode(true);
    $anchorScrollProvider.disableAutoScrolling();

}]);

app.run(function(){
    FastClick.attach(document.body);
});
// app.controler('mainController',function mainController($scope, $http) {   
// });
app.config(function ($interpolateProvider, paginationTemplateProvider, $stateProvider) {
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
        controller: function ($scope, $window) {
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
app.controller('animalCtrl', function ($scope, $filter, $q, $http) {



    $scope.sortReverse = false;
    $scope.pageSize = 5;



    $http.get('/api/animals').success(function (data) {
        // for(var i = 0 ; i < 5000 ; i++){
        //     var temp = angular.copy(data[0]);
        //     data.push(temp);
        // }
        $scope.animals = data;

    });

    $scope.addAnimal = function () {

        $http({
                method: 'POST',
                url: '/api/animals',
                data: $scope.animal,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function (animal) {

                $http.get('/api/animals').success(function (data) {
                    $scope.animals = data;
                    $scope.animal = null;
                    $("#animalAdd").modal('hide');

                });

            });

    };

    $scope.updateAnimal = function (a) {
        $scope.editAnimal = a;
        $("#animalEdit").modal('show');
    };

    $scope.submitUpdateAnimal = function (a) {

        $http({
                method: 'PUT',
                url: '/api/animals',
                data: $scope.editAnimal,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function (animal) {
                $scope.editAnimal = null;
                $http.get('/api/animals').success(function (data) {
                    $scope.animals = data;
                    $("#animalEdit").modal('hide');

                });

            });

    };

    $scope.deleteAnimal = function (a) {

        $http({
                method: 'DELETE',
                url: '/api/animals',
                data: a,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function (animal) {

                $http.get('/api/animals').success(function (data) {
                    $scope.animals = data;
                    $scope.editAnimal = null;
                    $('#animalEdit').modal('hide');
                });

            });
    };



});
//// Animal Controller End







//// Cage Controller Start
app.controller('cageCtrl', function ($scope, $filter, $q, $http, $rootScope, filterFilter) {


    // $scope.CageFormAddsubmit = function($event){
    //     if($scope.cageForm.$valid){
    //         $scope.addCage();
    //     }
    //     else{
    //         $scope.cageForm.cageNo.$touched = true;
    //     }
    // }

    $scope.checkCageNo = function (typingCageNo) { //檢查有沒有重複的cageNo

       //這個if判斷是為了檢查 修改籠子 如果是正在修改的籠子的號碼 不要算重複
            if($scope.cageNoForCheckingUpdate&&$scope.cageNoForCheckingUpdate==typingCageNo){  
                return false;
            }
        //這個if判斷是為了檢查 修改籠子 如果是正在修改的籠子的號碼 不要算重複 end

        if (typeof typingCageNo === "undefined") {
            return;
        }
        if ($scope.cages && filterFilter($scope.cages, {
                no: typingCageNo
            }, true).length > 0) {
            return true; //有重複
        } else {
            return false; //沒重複
        }

    }

    $("#cageEdit").on('hide.bs.modal', function () {
        $scope.errors = [];
    });

    $http.get('/api/animals').success(function (data) {
        $rootScope.animalsForCounting = data;
    });

    $scope.getCount = function (cageNo) {
        if(typeof $rootScope.animalsForCounting==='undefined'){return;}
        return filterFilter($rootScope.animalsForCounting, {
            cageNo: cageNo
        }, true).length;
    }

    $rootScope.ui = {
        animalInCage: false,
        cage: true
    };

    $scope.errors = [];

    $http.get('/api/cages').success(function (data) {

        // for(var i = 0 ; i < 5000 ; i++){
        //             var temp = angular.copy(data[0]);
        //             data.push(temp);
        //         }

        $scope.cages = data;
    });

    $scope.addCage = function () {

        $http({
                method: 'POST',
                url: '/api/cages',
                data: $scope.cage,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function (cage) {

                $http.get('/api/cages').success(function (data) {
                    $scope.cages = data;
                    $scope.cage = null;
                    $("#cageAdd").modal('hide');

                });

            });

    };

    $scope.updateCage = function (c) {
        $scope.$broadcast('loadAnimalInCage', c);
        $scope.editCage = angular.copy(c);
        $('#cageEdit').modal('show');

        $scope.cageNoForCheckingUpdate = $scope.editCage.no; //按下修改後馬上暫存的籠子編號 為了使用者輸入時檢查 是否有 重複編號 用的


    };

    $scope.toggleAnimalInCage = function (c) {
        $scope.$broadcast('updateCage', c); //在籠子管理點下 '管理' 按鈕，讀取籠內動物資料

    }

    $scope.submitUpdatecage = function () {

        $http({
                method: 'PUT',
                url: '/api/cages',
                data: $scope.editCage,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function (cage) {
                $scope.editCage = null;
                $http.get('/api/cages').success(function (data) {
                    $scope.cages = data;
                    $('#cageEdit').modal('hide');

                });

            });

    };

    $scope.deleteCage = function (a) {


        if ($rootScope.getSharedAnimal().length > 0) {
            $scope.errors.push({
                msg: '請先刪除或轉移籠子內的動物'
            });
        } else {
            $http({
                    method: 'DELETE',
                    url: '/api/cages',
                    data: a,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .success(function (cage) {

                    $http.get('/api/cages').success(function (data) {
                        $scope.cages = data;
                        $scope.editCage = null;
                        $('#cageEdit').modal('hide');
                    });

                });
        }

    };

    $scope.openCam = function (c) {
        window.open('http://' + c.ip + ':8090?no=' + c.no, "", "width=680,height=520");
    };
    $scope.turnOnCam = function (c) {
        $http.get('http://' + c.ip + ':8090' + '/on');
    };
    $scope.turnOffCam = function (c) {
        $http.get('http://' + c.ip + ':8090' + '/off');

    };

});
//// Cage Controller End



//// AnimalInCage Controller Start
app.controller('animalInCageCtrl', function ($scope, $filter, $q, $http, $rootScope, filterFilter) {

    //進入cage頁面時 讀取資料

        //新增動物的原因
        $http.get('/api/events?inOut=1')
            .success(function(data){
                $scope.eventsAdd = data;
              
            })
            .error(function(err){
                console.log(err);
            }); 
        //新增動物的原因 end

        //刪除動物的原因
        $http.get('/api/events?inOut=-1')
            .success(function(data){
                $scope.eventsDelete = data;
              
            })
            .error(function(err){
                console.log(err);
            }); 
        //刪除動物的原因 end




    //進入cage頁面時 讀取資料 end



    Array.prototype.getIndexBy = function (name, value) { //// 這個function可以全部js用一次就好
        for (var i = 0; i < this.length; i++) {
            if (this[i][name] == value) {
                return i;
            }
        }
        return -1;
    }

    $scope.deleteSelectedAnimalsInCage = function (oldCageNo) {

        var selectedAnimals = filterFilter($scope.animals, {
            isSelected: true
        }, true)

        var qPromiseArr = [];
        for (var i = 0; i < selectedAnimals.length; i++) {

            qPromiseArr.push($http({
                method: 'DELETE',
                url: '/api/animals',
                data: selectedAnimals[i],
                headers: {
                    'Content-Type': 'application/json'
                }
            }));
        }
        $q.all(qPromiseArr)
            .then(function (dataList) {

                //刪除原因儲存 

                var animallogs = [];

                for (var i = 0; i < selectedAnimals.length; i++) {

                    animallogs.push({

                        cageNo: selectedAnimals[i].cageNo,
                        animalId: selectedAnimals[i].idNo,
                        eventId: $scope.selectedEventDelete.idNo,
                        eventName: $scope.selectedEventDelete.name,
                        inOut: $scope.selectedEventDelete.inOut,
                        memo: $scope.selectedEventDelete.memo

                    });


                }


                var qPromiseArrForLog = [];
                    for (var i = 0; i < animallogs.length; i++) {

                        qPromiseArrForLog.push($http({
                            method: 'POST',
                            url: '/api/animallogs',
                            data: animallogs[i],
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }));
                    }

                $q.all(qPromiseArrForLog)
                    .then(function (dataList) {
                        console.log('delete log saved!!');
                    });

                //刪除原因儲存　end

                  // 刪除選擇的 新增原因
                $scope.selectedEventDeleteIdNo=null;
                $scope.selectedEventDelete=null;
                // 刪除選擇的 新增原因 end

                $scope.masterCheck = false;
                $http.get('/api/animals?cageNo=' + oldCageNo).success(function (data) {
                        $scope.animals = data;
                        $("#deleteAnimalsModal").modal('hide');
                        $http.get('/api/animals').success(function (data) {
                            $rootScope.animalsForCounting = data;

                        });

                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            });

    }

    
    $scope.switchCage = function (oldCageNo, newCageNo) { // 選取的動物換籠子


        var selectedAnimals = filterFilter($scope.animals, {
            isSelected: true
        }, true)
        var qPromiseArr = [];
        for (var i = 0; i < selectedAnimals.length; i++) {
            selectedAnimals[i].cageNo = newCageNo;
            qPromiseArr.push($http({
                method: 'PUT',
                url: '/api/animals',
                data: selectedAnimals[i],
                headers: {
                    'Content-Type': 'application/json'
                }
            }));
        }
        $q.all(qPromiseArr)
            .then(function (dataList) {
                $scope.masterCheck = false;
                $http.get('/api/animals?cageNo=' + oldCageNo).success(function (data) {
                        $scope.animals = data;
                        $scope.newCageNo = '';
                        $("#switchCageModal").modal('hide');

                        $http.get('/api/animals').success(function (data) {
                            $rootScope.animalsForCounting = data;
                        });

                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            });


    } // 選取的動物換籠子 end


    $scope.isSelected = function () { //判斷是否有打勾選擇
        if (typeof filterFilter($scope.animals, {
                isSelected: true
            }, true) === "undefined") {
            return;
        }

        if (filterFilter($scope.animals, {
                isSelected: true
            }, true).length > 0) {
            return true;
        } else {
            return false;
        }
    } //判斷是否有打勾選擇 end


    $scope.sourceIndex = function (keyName, key) { 

        var ix = $scope.animals.getIndexBy(keyName, key);
        return ix;

    }

    //// 再把animals換成自己要選擇的object array的

    $scope.checkAll = function () {
        //only visible rows
        var boxes = document.getElementsByClassName("rowSelector");
        for (var bix = 0; bix < boxes.length; bix++) {
            var ix = boxes[bix].value;
            $scope.animals[ix].isSelected = $scope.masterCheck;
        }
    }

    $scope.onPageChange = function (newPageNumber) {

        $scope.masterCheck = false;
        for (var i in $scope.animals) {
            $scope.animals[i].isSelected = false;
        }

    };

    $rootScope.getSharedAnimal = function () {
        return $scope.animals;
    }


    $scope.$on('updateCage', function (event, cage) { //在籠子管理點下 '管理' 按鈕，調整IU、讀取籠內動物資料

        $rootScope.ui.animalInCage = true;
        $rootScope.ui.cage = false;

        $scope.cage = cage;
        $http.get('/api/animals?cageNo=' + cage.no).success(function (data) {
            // for(var i = 0 ; i < 5000 ; i++){
            //     var temp = angular.copy(data[0]);
            //     data.push(temp);
            // }
            $scope.animals = data;


        });
    });

    $scope.$on('loadAnimalInCage', function (event, cage) {

        $http.get('/api/animals?cageNo=' + cage.no).success(function (data) {

            $scope.animals = data;


        });
    });

    $scope.sortReverse = false;
    $scope.pageSize = 5;





    $scope.addAnimal = function () {

        $scope.animal.cageNo = $scope.cage.no;
        $scope.animal.cageId = $scope.cage.idNo;

        

        $http({
                method: 'POST',
                url: '/api/animals',
                data: $scope.animal,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function (animal) {

                
                //新增原因儲存
                var animallog = {
                    cageNo : animal.cageNo,
                    animalId : animal.idNo,
                    eventId : $scope.selectedEventAdd.idNo,
                    eventName : $scope.selectedEventAdd.name,
                    inOut: $scope.selectedEventAdd.inOut,
                    memo:$scope.selectedEventAdd.memo
                };
                $http({
                    method: 'POST',
                    url: '/api/animallogs',
                    data: animallog,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .success(function (animallog) {

                });
                //新增原因儲存　end

                // 清空選擇的 新增原因
                $scope.selectedEventAddIdNo=null;
                $scope.selectedEventAdd=null;
                // 清空選擇的 新增原因 end


                $http.get('/api/animals?cageNo=' + $scope.cage.no).success(function (data) {

                    $scope.animals = data;
                    $scope.animal = null;
                    $("#animalInCageAdd").modal('hide');
                    $http.get('/api/animals').success(function (data) {
                        $rootScope.animalsForCounting = data;
                    });

                });


            })
            .error(function () {
                $('#myModal').modal('show');
            });

    };

    $scope.updateAnimal = function (a) {

        $scope.editAnimal = a;
        $('#cageAnimalEdit').modal('show');
    };

    $scope.submitUpdateAnimal = function (a) {

        $http({
                method: 'PUT',
                url: '/api/animals',
                data: $scope.editAnimal,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function (animal) {

                $scope.editAnimal = null;
                $scope.masterCheck = false;
                $http.get('/api/animals?cageNo=' + $scope.cage.no).success(function (data) {

                    $scope.animals = data;
                    $('#cageAnimalEdit').modal('hide');


                });
            });

    };

    // $scope.deleteAnimal = function (a) {



    //     $http({
    //             method: 'DELETE',
    //             url: '/api/animals',
    //             data: a,
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //         .success(function (animal) {
                
    //             // 刪除選擇的 刪除原因
    //             $scope.selectedEventDeleteIdNo=null;
    //             $scope.selectedEventDelete=null;
    //             // 刪除選擇的 刪除原因 end

    //             $http.get('/api/animals?cageNo=' + $scope.cage.no).success(function (data) {

    //                 $scope.animals = data;
    //                 $scope.editAnimal = null;
    //                 $('#cageAnimalEdit').modal('hide');
    //                 $http.get('/api/animals').success(function (data) {
    //                     $rootScope.animalsForCounting = data;
    //                 });

    //             });


    //         });
    // };



});
//// AnimalInCage Controller End

//// Strains Controller Start
app.controller('strainCtrl', function ($scope, $filter, $q, $http) {



    $http.get('/api/strains').success(function (data) {
        $scope.strains = data;
    });

    $scope.addStrain = function () {

        $http({
                method: 'POST',
                url: '/api/strains',
                data: $scope.strain,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function (strain) {

                $http.get('/api/strains').success(function (data) {
                    $scope.strains = data;
                    $scope.strain = null;
                    $("#list").tab('show');

                });

            });

    };

    $scope.updateStrain = function (c) {
        $scope.editStrain = c;
        $('#edit').tab('show');
    };

    $scope.submitUpdateStrain = function () {

        $http({
                method: 'PUT',
                url: '/api/strains',
                data: $scope.editStrain,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function (strain) {
                $scope.editStrain = null;
                $http.get('/api/strains').success(function (data) {
                    $scope.strains = data;
                    $('#list').tab('show');

                });

            });

    };

    $scope.deleteStrain = function (a) {

        $http({
                method: 'DELETE',
                url: '/api/strains',
                data: a,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function (strain) {

                $http.get('/api/strains').success(function (data) {
                    $scope.strains = data;
                    $scope.editStrain = null;
                    $('#list').tab('show');
                });

            });
    };



});

////Strain Controller End



//// events Controller Start
app.controller('eventCtrl', function ($scope, $filter, $q, $http) {



    $http.get('/api/events').success(function (data) {
        $scope.events = data;
    });

    $scope.addEvent = function () {

        $http({
                method: 'POST',
                url: '/api/events',
                data: $scope.event,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function (event) {

                $http.get('/api/events').success(function (data) {
                    $scope.events = data;
                    $scope.event = null;
                    $("#list").tab('show');

                });

            });

    };

    $scope.updateEvent = function (e) {
        $scope.editEvent = e;
        $('#edit').tab('show');
    };

    $scope.submitUpdateEvent = function () {

        $http({
                method: 'PUT',
                url: '/api/events',
                data: $scope.editEvent,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function (event) {
                $scope.editEvent = null;
                $http.get('/api/events').success(function (data) {
                    $scope.events = data;
                    $('#list').tab('show');

                });

            });

    };

    $scope.deleteEvent = function (e) {

        $http({
                method: 'DELETE',
                url: '/api/events',
                data: e,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success(function (event) {

                $http.get('/api/events').success(function (data) {
                    $scope.events = data;
                    $scope.editEvent = null;
                    $('#list').tab('show');

                });

            });
    };



});

////Strain Controller End


//// index Controll start

app.controller('indexCtrl', function ($scope, $filter, $http) {

    Chart.defaults.global.colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#FDB45C', '#FB6964', '#342224'];


    ////Bar Chart
    $scope.barChart = {};
    $scope.barChart.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.barChart.series = ['Series A', 'Series B', 'qq'];
    $scope.barChart.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90],
        [28, 48, 40, 19, 86, 27, 90]
    ];

    ////Bar Chart end

    ////Line Chart
    $scope.lineChart = {};
    $scope.lineChart.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.lineChart.series = ['Series A'];
    $scope.lineChart.data = [
        [65, 59, 80, 81, 56, 55, 40]
    ];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
    $scope.lineChart.datasetOverride = [{
        yAxisID: 'y-axis-1'
    }, {
        yAxisID: 'y-axis-2'
    }];
    $scope.lineChart.options = {
        scales: {
            yAxes: [{
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'left'
            }, {
                id: 'y-axis-2',
                type: 'linear',
                display: true,
                position: 'right'
            }]
        }
    };

    ////Line Chart end



    //// Pie Chart
    $http.get('/api/animals').success(function (animals) {
        
        $scope.pieChart = {};
        $scope.pieChart.labels = [];
        $scope.pieChart.data = [];
        
        angular.forEach($filter('unique')(animals,'cageNo'),function(value,key){
            $scope.pieChart.labels.push('籠號: '+value.cageNo);
            $scope.pieChart.data.push($filter('filterBy')(animals,['cageNo'],value.cageNo).length);
        });

        
        $scope.pieChart.options = {
            legend: {
                display: true
            }
        };

    });


    //// Pie Chart end




});


//// index Controll end