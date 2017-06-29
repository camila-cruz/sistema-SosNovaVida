angular.module('novaVida').controller('doadorCtrl', function( $scope, doador, uf ) {
    $scope.doadores = doador.data;
    $scope.ufs = uf.data;
});