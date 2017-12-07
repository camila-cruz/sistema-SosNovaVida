angular.module('novaVida').config( function( $routeProvider ) {
    $routeProvider.when('/config', {
        templateUrl: 'view/formConfig.html',
        controller: 'configController'
    });
    $routeProvider.when('/index', {
        templateUrl: 'view/inicio.html',
        controller: 'inicioCtrl',
        resolve: {
            graficoEstoque: ( graficosAPI ) => {
                return graficosAPI.getGraficoEstoque();
            }
        }
    });
    /*$routeProvider.when('/grafico/acolhidos/:jota', {
        controller: 'inicioCtrl',
        resolve: {
            graficoAcolhido: ( graficosAPI, $route ) => {
                return graficosAPI.getGraficoAcolhido($route.current.params.jota);
            }
        }
    });*/

    $routeProvider.otherwise({ redirectTo: '/index'});
});