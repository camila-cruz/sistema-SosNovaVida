angular.module('novaVida').controller('acolhidoCtrl', function( $scope, acolhido, acolhidoAPI, uf ){ 
    $scope.acolhidos = acolhido.data;
    $scope.ufs = uf.data;

    $scope.adicionarAcolhido = (acolhido) => {
        console.log("Chegou na controller");
        acolhidoAPI.setAcolhidos(acolhido).then((response) => {
            console.log("Sucesso");
        }).catch((err) => {
            console.log("O erro é: " + err);
        });
    };
});