angular.module('novaVida').factory('doadoresAPI', function( $http ) {
    let _getDoadores = () => {
        return $http.get( config.baseUrl + '/doadores' );
    };

    let _setDoadores = () => {
        return $http.post( config.baseUrl + '/doadores' );
    }

    return {
        getDoadores: _getDoadores,
        setDoadores: _setDoadores
    };
});