angular.module("novaVida").controller("detalhesAcolhidoCtrl", function ( $scope, $routeParams, acolhidoAPI ) {
  $scope.acolhido = acolhidoAPI.data;
});