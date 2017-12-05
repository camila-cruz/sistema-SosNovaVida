angular.module('novaVida').factory('listaAPI', function( $http, config ) {

// ------------------------- Estoque ------------------------
  const _getListaEstoque = () => {
    return $http.get( config.baseUrl + '/lista/estoque' );
  };

  const _getListaEstoqueById = (id ) => {
      return $http.get( config.baseUrl + '/lista/estoque/' + id);
  };

  const _postListaEstoque = ( lista ) => {
      return $http.post( config.baseUrl + '/lista/estoque', lista );
  }

  const _putListaEstoque = ( lista ) => {
      return $http.put( config.baseUrl + '/lista/estoque/' + lista.id, lista );
  }

  const _deleteListaEstoque = ( id ) => {
      return $http.delete( config.baseUrl + '/lista/estoque/' + id/* , { data: lista , headers: { 'Content-type': 'application/json;charset=utf-8' } } */ );
  }

// ------------------------- Acolhido -----------------------


  const _getListaAcolhido = () => {
    return $http.get( config.baseUrl + '/lista/acolhido' );
  };

  const _getListaAcolhidoById = (id ) => {
      return $http.get( config.baseUrl + '/lista/acolhido' + id);
  };

  const _postListaAcolhido = ( lista ) => {
      return $http.post( config.baseUrl + '/lista/acolhido', lista );
  }

  const _putListaAcolhido = ( lista, id ) => {
      return $http.put( config.baseUrl + '/lista/acolhido/' + id, lista );
  }

  const _deleteListaAcolhido = ( lista ) => {
      return $http.delete( config.baseUrl + '/lista/acolhido', { data: lista , headers: { 'Content-type': 'application/json;charset=utf-8' } } );
  }

  return {
// ------------------------- Estoque ------------------------
      getListaEstoque: _getListaEstoque,
      getListaEstoqueById: _getListaEstoqueById,
      postListaEstoque: _postListaEstoque,
      putListaEstoque: _putListaEstoque,
      deleteListaEstoque: _deleteListaEstoque,

// ------------------------- Acolhido -----------------------

      getListaAcolhido: _getListaAcolhido,
      getListaAcolhidoById: _getListaAcolhidoById,
      postListaAcolhido: _postListaAcolhido,
      putListaAcolhido: _putListaAcolhido,
      deleteListaAcolhido: _deleteListaAcolhido      
  };
});