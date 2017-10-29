angular.module('novaVida').controller('estoqueCtrl', function( $scope, estoque ) {
    $scope.produtos = estoque.data;
    $scope.modoDeAbertura = "criar";
});