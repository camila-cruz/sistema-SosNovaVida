angular.module('novaVida').controller('doadorCtrl', function( $scope, doadorAPI, uf ) {
    $scope.doadores = doadorAPI.data;
    $scope.ufs = uf.data;

    $scope.cadastrarDoador = ( formDoador ) => {
        console.log('Passando doador para o back-end');
        doadorAPI.setDoador( formDoador );
    };

});