angular.module('novaVida').controller('piaCtrl', function($scope, $routeParams, acolhido) {
    console.log("Chegou na controller do pia");
    // Pega o objeto que vem pela lista e faz o "bind" com a variável local da controller
    $scope.acolhido = acolhido.data;
});