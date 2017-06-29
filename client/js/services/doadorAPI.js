angular.module('novaVida').factory('doadorAPI', function( $http, config ) {
    let _getDoadores = () => {
        return $http.get( config.baseUrl + '/doadores' );
    };

    let _setDoador = ( doador ) => {
        return $http.post( config.baseUrl + '/doadores', doador );
    }

    return {
        getDoadores: _getDoadores,
        setDoador: _setDoador
    };
});