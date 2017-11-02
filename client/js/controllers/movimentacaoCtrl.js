angular.module('novaVida').controller('movimentacaoCtrl', function( $scope, movimentacao ) {
    console.log('Chamou controller');
    console.log( movimentacao.data );
    $scope.movimentacoes = movimentacao.data;
});