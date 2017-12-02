angular.module('novaVida').controller('consultaDoacoesCtrl', function( $scope, doacoes ) {
  $scope.doacoes = doacoes.data;
  console.log( $scope.doacoes );
});