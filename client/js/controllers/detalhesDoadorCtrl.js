angular.module("novaVida").controller("detalhesDoadorCtrl", function ( $scope, $location, doadorGet, doadorAPI ) {
	$scope.doador = doadorGet.data;

	$scope.alterarDoador = ( doador ) => {
		console.log(doadorAPI);
		doadorAPI.putDoador( doador, doador.id )
			.then( response => {
				alert('Doador alterado com sucesso!');
				$location.path('/consulta/doador')
			})
			.catch( err => {
				console.log( err );
			});
	};

	$scope.voltar = () => {
		$location.path('/consulta/doador')
	}

});