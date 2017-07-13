angular.module('novaVida').factory('doadorAPI', function( $http, config ) {
    let _getDoadores = () => {
        return $http.get( config.baseUrl + '/doadores' );
    };

    let _getDoadorById = (id) => {
        return $http.get( config.baseUrl + '/doadores/' + id);
    };

    let _setDoador = ( doador ) => {
        return $http.post( config.baseUrl + '/doadores', doador );
    }

    return {
        getDoadores: _getDoadores,
        getDoadorById: _getDoadorById,
        setDoador: _setDoador
    };
});