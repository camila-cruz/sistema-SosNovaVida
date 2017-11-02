angular.module("novaVida").controller("detalhesAcolhidoCtrl", function ( $scope, $routeParams, acolhido ) {
  $scope.acolhido = acolhido.data;
});