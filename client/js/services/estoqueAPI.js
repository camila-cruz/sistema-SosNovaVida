angular.module('novaVida').factory('estoqueAPI', function( $http, config ) {

    const _getEstoque = () => {
        return $http.get( config.baseUrl + '/estoque' );
    };

    const _setEstoque = () => {
        return $http.post( config.baseUrl + '/estoque' );
    }
    
    return {
        getEstoque: _getEstoque,
        setEstoque: _setEstoque
    }
});