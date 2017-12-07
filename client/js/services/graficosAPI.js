angular.module('novaVida').factory('graficosAPI', function( $http, config ) {
  const _getGraficoEstoque = () => {
    return $http.get( config.baseUrl + '/grafico/estoque' );
  };

  const _getGraficoAcolhido = (jota) => {
    return $http.get( config.baseUrl + '/grafico/acolhidos/' + jota);
  }

  return {
    getGraficoEstoque: _getGraficoEstoque,
    getGraficoAcolhido: _getGraficoAcolhido
  }

});