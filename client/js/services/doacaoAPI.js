angular.module('novaVida').factory('doacaoAPI', function( $http, config ) {
  const _getDoacoes = () => {
      return $http.get( config.baseUrl + '/doacoes' );
  };

  const _postDoacao = ( doacao ) => {
      return $http.post( config.baseUrl + '/doacoes', doacao );
  }

  return {
      getDoacoes: _getDoacoes,
      postDoacao: _postDoacao
  };
});