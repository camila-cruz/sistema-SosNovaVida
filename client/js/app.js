angular.module('novaVida', [ 'ngRoute' ] );

angular.module('novaVida').controller('inicioController', function( $scope, loginAPI ) {
    $scope.app = 'SOS Nova Vida'
    $scope.isLogado = false;

    $scope.loga = ( usuario ) => {
        loginAPI
          .postLogin( usuario )
          .then( results => { 
              $scope.isLogado = true;
            })
          .catch( err => { 
              $scope.usuario = {};
              const statusCode = err.status;

              if ( statusCode == 404 ) return alert('Login não localizado, verifique os dados.');
              return alert('Senha incorreta, tente novamente.');
            });
    };

    $scope.limpa = () => {
        $scope.usuario = {};
    }

});