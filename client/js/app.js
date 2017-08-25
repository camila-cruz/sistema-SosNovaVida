angular.module('novaVida', [ 'ngRoute' ] );

angular.module('novaVida').controller('inicioController', function( $scope ) {
    $scope.app = 'SOS Nova Vida'
    $scope.user = 'Simone'
});