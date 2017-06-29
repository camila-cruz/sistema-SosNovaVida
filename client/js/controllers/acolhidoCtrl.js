angular.module('novaVida').controller('acolhidoCtrl', function( $scope, acolhido, uf ){ 
    $scope.acolhidos = acolhido.data;
    $scope.ufs = uf.data;
});