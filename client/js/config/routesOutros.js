angular.module('novaVida').config( function( $routeProvider ) {
    $routeProvider.when('/config', {
        templateUrl: 'view/formConfig.html'
    });
    $routeProvider.when('/contabil', {
        templateUrl: 'view/formContabilidade.html',
        controller: 'contabilCtrl',
        resolve: {
            contabil: (contabilAPI) => {
                return contabilAPI.getContabil(); 
            }
        }
    });
    $routeProvider.when('/index', {
        templateUrl: 'view/inicio.html'
    });
    $routeProvider.when('/login', {
        templateUrl: 'view/login.html'
    });
    $routeProvider.otherwise({ redirectTo: '/index'});
});