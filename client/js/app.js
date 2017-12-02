angular.module('novaVida', [ 'ngRoute' ] );

angular.module('novaVida').controller('inicioController', function( $scope, loginAPI, $location ) {
    $scope.app = 'SOS Nova Vida'
    $scope.isLogado = false;
    $scope.erro = false;

    $scope.loga = (usuario) => {
        loginAPI
            .postLogin(usuario)
            .then(results => {
                swal("Bem-Vindo(a)", "Bem-vindo(a) ao sistema da SOS Nova Vida.", "success"); 
                $scope.isLogado = true;
                $location.path('/index');
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

    $scope.desloga = () => {
        $scope.isLogado = false;
    }
});