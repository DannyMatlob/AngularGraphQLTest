console.log('SandwichBuilder Operational');
var mainApp = angular.module("mainApp", []);  
    mainApp.controller('sandwichController', function($scope) {
        $scope.sandwich = {
            bread: $scope.selectedBread,
            topping1: $scope.selectedTopping1,
            topping2: $scope.selectedTopping2,
            condiment1: $scope.selectedCondiment1,
            condiment2: $scope.selectedCondiment2,

            fullSandwich: function() {
                var sandwichObject;
                sandwichObject = $scope.sandwich;
                return  sandwichObject.bread + " " +
                        sandwichObject.topping1 + " " +
                        sandwichObject.topping2 + " " +
                        sandwichObject.bread + " " +
                        sandwichObject.bread + " ";
            }
             
        };
        $scope.buildSandwich = function() {
            console.log($scope.selectedBread);
        }
    });