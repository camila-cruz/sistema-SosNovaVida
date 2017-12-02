angular.module('novaVida').controller('acolhidoCtrl', function( $scope, acolhido, acolhidoAPI, uf ){ 
    $scope.acolhidos = acolhido.data;
    $scope.ufs = uf.data;
    $scope.modoDeAbertura = "criar";

    $scope.carregarAcolhidos = () => {
        acolhidoAPI.getAcolhidos().then((response) => {
            console.log(response.data);
        }).catch((err) => {
            swal("Opa...", "Houve um erro, tente novamente!", "error");
            console.log("Erro no get: " + err.message);
        });
    };

    $scope.cadastrarAcolhido = (acolhidos) => {
        console.log("Chegou na controller");
        acolhidoAPI.setAcolhidos(acolhidos).then((response) => {
            swal("Sucesso!", "Acolhido cadastrado com sucesso!", "success"); 
            console.log("Sucesso");
        }).catch((err) => {
            swal("Opa...", "Houve um erro, tente novamente!", "error");
            console.log("O erro é: " + err);
        });
    };
});