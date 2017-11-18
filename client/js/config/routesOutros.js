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
    $routeProvider.otherwise({ redirectTo: '/index'});
});