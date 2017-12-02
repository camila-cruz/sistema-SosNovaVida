angular.module('novaVida', [ 'ngRoute' ] );

angular.module('novaVida').controller('inicioController', function( $scope, loginAPI ) {
    $scope.app = 'SOS Nova Vida'
    $scope.isLogado = false;
    $scope.erro = false;

    $scope.loga = (usuario) => {
        loginAPI
            .postLogin(usuario)
            .then(results => { 
                $scope.isLogado = true;
            })
            .catch(err => { 
                $scope.usuario = {};
                //const statusCode = err.status;

                return swal("Opa...", "Usuário ou senha incorretos!", "error");
            });
    };

    $scope.limpa = () => {
        $scope.usuario = {};
    }
});