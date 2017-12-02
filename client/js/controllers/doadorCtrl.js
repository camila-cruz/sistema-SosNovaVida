angular.module('novaVida').controller('doadorCtrl', function( $scope, $location, doadorGet, doadorAPI, uf ) {
    $scope.doadores = doadorGet.data;
    $scope.ufs = uf.data;

    $scope.cadastrarDoador = ( doador ) => {
        doadorAPI.postDoador( doador )
          .then( response => {
            alert('Doador cadastrado com sucesso!');
            $location.path('/consulta/doador')
          })
          .catch( err => {
            console.log( err );
          });
    };

    $scope.excluirSelecionados = ( doadores ) => {
      if ( confirm('Deseja realmente excluir os doadores selecionados?') ) {
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
            $scope.doadores = doadoresRemanescentes;
          })
          .catch( err => {
            console.log( response )
          });
      }
    };

    $scope.voltar = () => {
        $location.path('/consulta/doador')
    }

});