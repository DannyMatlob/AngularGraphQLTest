const endpoint = 'http://localhost:4000/graphql';

async function getStock(name) {
    var stock = 0;
    const query = '{ingredients(name: "' + name + '"){stock}}';
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '{ingredients(name: "' + name + '"){stock}}'}),
    });
    const result = await response.json();
    stock = result.data.ingredients[0].stock
    return stock;
}

var mainApp = angular.module("mainApp", []); 
    mainApp.controller('sandwichController', function($scope) {
        $scope.buildSandwich = async function() {
            var sandwichObject = await Promise.resolve({
                bread: $scope.selectedBread,
                topping1: $scope.selectedTopping1,
                topping2: $scope.selectedTopping2,
                condiment1: $scope.selectedCondiment1,
                condiment2: $scope.selectedCondiment2,
                breadStock: await getStock($scope.selectedBread),
                topping1Stock: await getStock($scope.selectedTopping1),
                topping2Stock: await getStock($scope.selectedTopping2),
                condiment1Stock: await getStock($scope.selectedCondiment1),
                condiment2Stock: await getStock($scope.selectedCondiment2),
            });
            console.log(sandwichObject);
            $scope.breadStock = sandwichObject.bread + ": " + sandwichObject.breadStock;
            $scope.topping1Stock = sandwichObject.topping1 + ": " + sandwichObject.topping1Stock;
            $scope.topping2Stock = sandwichObject.topping2 + ": " + sandwichObject.topping2Stock;
            $scope.condiment1Stock = sandwichObject.condiment1 + ": " + sandwichObject.condiment1Stock;
            $scope.condiment2Stock = sandwichObject.condiment2 + ": " + sandwichObject.condiment2Stock;
        }
    });