angular.module('novaVida').factory('graficosAPI', function( $http, config ) {
  const _getGraficoEstoque = () => {
    return $http.get( config.baseUrl + '/grafico/estoque' );
  };

  const _getGraficoAcolhido = () => {
    return $http.get( config.baseUrl + '/grafico/acolhidos' );
  }

  return {
    getGraficoEstoque: _getGraficoEstoque,
    getGraficoAcolhido: _getGraficoAcolhido
  }

});