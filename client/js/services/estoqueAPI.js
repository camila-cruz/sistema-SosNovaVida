angular.module('novaVida').factory('estoqueAPI', function( $http, config ) {

    const _getEstoque = () => {
        return $http.get( config.baseUrl + '/estoque' );
    };

    const _postEstoque = ( produto ) => {
        return $http.post( config.baseUrl + '/estoque', produto );
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