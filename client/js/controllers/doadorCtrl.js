angular.module('novaVida').controller('doadorCtrl', function( $scope, doadoresAPI ) {
    $scope.app = 'SOS Nova Vida';
    $scope.doadores = [];

    let carregarDoadores = () => {
        doadoresAPI.getContatos().then( data => {
            $scope.doadores = data.data;
        });
    };

    carregarDoadores()

});