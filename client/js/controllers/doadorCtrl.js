angular.module('novaVida').controller('doadorCtrl', function( $scope, $location, doadorGet, doadorAPI, uf ) {
    $scope.doadores = doadorGet.data;
    $scope.ufs = uf.data;

    $scope.cadastrarDoador = ( doador ) => {
        doadorAPI.postDoador( doador )
            .then( response => {
                swal("Sucesso!", "Doador cadastrado com sucesso!", "success");
                $location.path('/consulta/doador')
            })
            .catch( err => {
                swal("Opa...", "Houve um erro, tente novamente!", "error");
                console.log( err );
            });
    };

    $scope.excluirSelecionados = ( doadores ) => {

        swal({
            title: 'Atenção',
            text: "Deseja realmente excluir os doadores selecionados?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sim'
        }).then((result) => {
            if (result.value) {
                const doadoresSelecionados = doadores.filter( doador => {
                    if ( doador.selecionado ) {
                        return doador.id;
                    }
                });
            
                const doadoresRemanescentes = doadores.filter( doador => {
                    if ( !doador.selecionado ) {
                        return doador.id;
                    }
                });
                console.log( doadoresSelecionados );
        
                doadorAPI.deleteDoador( doadoresSelecionados )
                    .then( response => {
                        swal("Sucesso!", "Doador apagado com sucesso!", "success");
                        $scope.doadores = doadoresRemanescentes;
                    })
                    .catch( err => {
                        swal("Opa...", "Houve um erro, tente novamente!", "error");
                        console.log( response )
                    });
            }       
        });
    };

    $scope.voltar = () => {
        $location.path('/consulta/doador')
    }
});