angular.module('novaVida').factory('movimentacaoAPI', function( $http, config ) {
    const _getMovimentacao = () => {
        return $http.get( config.baseUrl + '/movimentacao' );
    };

    return {
        getMovimentacao: _getMovimentacao
    }
});