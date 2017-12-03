angular.module('novaVida').controller('doacaoCtrl', function( $scope, doadorAPI, doacaoAPI ) {

    $scope.doacao = {};
    $scope.doacao.doador = {};

    $scope.limpar = () => {
        $scope.doacao = {}
    }

    $scope.filtra = ( doador ) => {
        if ( doador == '' ) {
            $scope.buscando = false;
        } else {
            doadorAPI.getDoadorByNome( doador )
                .then( doadores => {
                    $scope.buscando = true;
                    $scope.dicas = doadores.data
                    console.log( doadores.data );
                })
                .catch( err => {
                    console.log( err );
                })
        }
    }

    $scope.adicionaDoador = ( doador ) => {
        $scope.doacao.nomeDoador = doador.nome;
        $scope.doacao.doador = doador;

        console.log( $scope.doacao );
        $scope.dicas = {};
    }

    $scope.cadastrarDoacao = ( doacao ) => {
        doacaoAPI.postDoacao( doacao )
            .then( () => {
                swal("Sucesso!", "Doação realizada com sucesso!", "success");
                $scope.doacao = {};
            })
            .catch( err => {
                swal("Opa...", "Houve um erro, tente novamente!", "error");
                console.log( err );
            })
    } 

  });