angular.module('novaVida').controller('doadorCtrl', function( $scope, doadorAPI, uf ) {
    $scope.doadores = doadorAPI.data;
    $scope.ufs = uf.data;

    $scope.cadastrarDoador = ( formDoador ) => {
        doadorAPI.setDoador( formDoador );
    };

});