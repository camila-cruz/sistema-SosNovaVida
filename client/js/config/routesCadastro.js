angular.module('novaVida').config( function( $routeProvider ) {
    $routeProvider.when('/cadastro/doador', {
        templateUrl: 'view/formDoador.html',
        controller: 'doadorCtrl',
        resolve: {
            doadorGet: ( doadorAPI ) => {
                return doadorAPI;
            },
            uf: function(ufAPI){
                return ufAPI.getUF();
            }
        }
    });
    $routeProvider.when('/cadastro/acolhido', {
        templateUrl: 'view/formAcolhido.html',
        controller: 'acolhidoCtrl',
        resolve: {
            acolhido: ( acolhidoAPI ) => {
                return acolhidoAPI;
            },
            uf: function(ufAPI){
                return ufAPI.getUF();
            }
        }
    });
    $routeProvider.when('/cadastro/doacao', {
        templateUrl: 'view/formDoacao.html'
    });
});