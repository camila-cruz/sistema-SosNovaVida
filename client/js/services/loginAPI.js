angular.module('novaVida').factory('loginAPI', function( $http, config ) {
  const _postLogin = ( usuario ) => {
    return $http.post( config.baseUrl + '/login', usuario );
  }

  return {
      postLogin: _postLogin
  }
});