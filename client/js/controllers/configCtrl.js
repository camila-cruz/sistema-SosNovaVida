angular.module('novaVida').controller('configController', function( $scope, configAPI ) {

  const _putUsuario = ( usuario ) => {
    if ( usuario.senha == null && usuario.nomeUsuario !== null ) {
      //Se a senha não foi preenchida, altera só o login
      configAPI
        .putLogin( usuario )
        .then( () => { 
          $scope.usuario = {};
          return alert('Login alterado com sucesso.');
        })
        .catch( err => { return console.log( err ) } )

    } else if ( usuario.nomeUsuario == null && usuario.senha !== null ) {
      //Se a login não foi preenchido, altera só a senha
      configAPI
        .putSenha( usuario )
        .then( () => { 
          $scope.usuario = {};
          return alert('Senha alterada com sucesso');
        })
        .catch( err => { return console.log( err ) } )

    } else if ( usuario.nomeUsuario !== null && usuario.senha !== null ) {
      //Se a senha E o login foram preenchidos, altera os dois.
      configAPI
        .putUsuario( usuario )
        .then( () => { 
          $scope.usuario = {};
          return alert('Usuario e senha alterados com sucesso'); 
        })
        .catch( err => { return console.log( err ) } )
    }
  };

  $scope.alterarUsuario = ( usuario ) => { return _putUsuario( usuario ) };
  $scope.usuario = {};
});