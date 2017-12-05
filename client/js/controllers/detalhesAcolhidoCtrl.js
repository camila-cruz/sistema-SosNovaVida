angular.module("novaVida").controller("detalhesAcolhidoCtrl", function ( $scope, $routeParams, acolhido ) {
    $scope.acolhido = acolhido.data;


    $scope.alterarAcolhido = (acolhido) => {

    };

    $scope.voltar = () => {
		$location.path('/consulta/doador')
	}
});