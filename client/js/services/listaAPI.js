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
      return $http.delete( config.baseUrl + '/lista/estoque/' + id );
  }

// ------------------------- Acolhido -----------------------


  const _getListaAcolhido = () => {
    return $http.get( config.baseUrl + '/lista/acolhido' );
  };

  const _getListaAcolhidoById = (id ) => {
      return $http.get( config.baseUrl + '/lista/acolhido/' + id);
  };

  const _postListaAcolhido = ( lista ) => {
      return $http.post( config.baseUrl + '/lista/acolhido/' + lista.id, lista );
  }

  const _putListaAcolhido = ( lista ) => {
      console.log( 'Lista na API: ', lista );  
      return $http.put( config.baseUrl + '/lista/acolhido/' + lista.id, lista );
  }

  const _deleteListaAcolhido = ( id ) => {
      return $http.delete( config.baseUrl + '/lista/acolhido/' + id );
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