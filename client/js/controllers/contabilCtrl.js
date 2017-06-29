angular.module('novaVida').controller('contabilCtrl', function($scope, contabil) {
    $scope.movimentacoes = contabil.data;

    $scope.ordenarPor = function (campo) {
        console.log('Ordenando por ' + campo);
		$scope.criterioDeOrdenacao = campo;
	}
    
});