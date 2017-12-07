//Padrão de projeto fábrica que se comunica com o BackEnd, externaliza o '''módulo''' acolhidoAPI
angular.module('novaVida').factory('configAPI', function( $http, config ) {
  const _putUsuario = ( usuario ) => {
    return $http.put( config.baseUrl + '/usuario', usuario );
  };

  const _putLogin = ( usuario ) => {
    return $http.put( config.baseUrl + '/usuario/login', usuario );
  }

  const _putSenha = ( usuario ) => {
    return $http.put( config.baseUrl + '/usuario/senha', usuario ); 
  }

  const _getSenha = () => {
    return $http.get( config.baseUrl + '/usuario/senha');
  }

  const _getConfig = ( ) => {
    return $http.get( config.baseUrl + '/usuario' );
  };

  return {
    putUsuario: _putUsuario,
    putLogin: _putLogin,
    putSenha: _putSenha,
    getConfig: _getConfig,
    getSenha: _getSenha
  }

});