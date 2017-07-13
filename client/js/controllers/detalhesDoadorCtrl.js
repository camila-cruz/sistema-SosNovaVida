angular.module("novaVida").controller("detalhesDoadorCtrl", function ( $scope, $routeParams, doadorAPI ) {
	$scope.doador = doadorAPI.data;
});