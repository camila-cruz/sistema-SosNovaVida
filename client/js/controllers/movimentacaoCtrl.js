angular.module('novaVida').controller('movimentacaoCtrl', function( $scope, movimentacao ) {

    $scope.movimentacoes = movimentacao.data;
});