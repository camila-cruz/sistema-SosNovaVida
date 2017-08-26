angular.module('novaVida').controller('acolhidoCtrl', function( $scope, acolhido, acolhidoAPI, uf ){ 
    $scope.acolhidos = acolhido.data;
    $scope.ufs = uf.data;

    $scope.carregarAcolhidos = () => {
        acolhidoAPI.getAcolhidos().then((response) => {
            console.log(response.data);
        }).catch((err) => {
            console.log("Erro no get: " + err.message);
        });
    };

    $scope.adicionarAcolhido = (acolhidos) => {
        console.log("Chegou na controller");
        acolhidoAPI.setAcolhidos(acolhidos).then((response) => {
            console.log("Sucesso");
        }).catch((err) => {
            console.log("O erro é: " + err);
        });
    };
});