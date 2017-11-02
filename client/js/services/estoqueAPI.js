angular.module('novaVida').factory('estoqueAPI', function( $http, config ) {

    const _getEstoque = () => {
        return $http.get( config.baseUrl + '/estoque' );
    };

    const _postEstoque = () => {
        return $http.post( config.baseUrl + '/estoque' );
    }

    const _putEstoque = ( produto ) => {
        return $http.put( config.baseUrl + '/estoque/' + produto.id, produto )
    }
    
    return {
        getEstoque: _getEstoque,
        postEstoque: _postEstoque,
        putEstoque: _putEstoque
    }
});