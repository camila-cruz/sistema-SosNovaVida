angular.module('novaVida').controller('movimentacaoCtrl', function($scope, movimentacao, movimentacaoAPI) {
    $scope.movimentacoes = movimentacao.data;
});