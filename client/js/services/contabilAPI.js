angular.module('novaVida').factory('contabilAPI', function( $http, config ) {
    
    const _getContabil = () => {
        return $http.get( config.baseUrl + '/contabil' );
    }

    const _setContabil = () => {
        return $http.post( config.baseUrl + '/contabil' );
    }
    
    return {
        getContabil: _getContabil,
        setContabil: _setContabil
    }
});