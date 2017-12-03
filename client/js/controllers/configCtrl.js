angular.module('novaVida').controller('configController', function( $scope, configAPI ) {

  const _putUsuario = ( usuario ) => {
    if ( usuario.senha == null && usuario.nomeUsuario !== null ) {
      //Se a senha não foi preenchida, altera só o login
      configAPI
        .putLogin( usuario )
        .then( () => { 
          $scope.usuario = {};
          return swal("Sucesso!", "Login alterado com sucesso!", "success");
        })
        .catch( err => {
            swal("Opa...", "Houve um erro, tente novamente!", "error");
        })

    } else if ( usuario.nomeUsuario == null && usuario.senha !== null ) {
      //Se a login não foi preenchido, altera só a senha
      configAPI
        .putSenha( usuario )
        .then( () => { 
          $scope.usuario = {};
          return swal("Sucesso!", "Senha alterada com sucesso!", "success");
        })
        .catch( err => { 
            swal("Opa...", "Houve um erro, tente novamente!", "error");
        })

    } else if ( usuario.nomeUsuario !== null && usuario.senha !== null ) {
      //Se a senha E o login foram preenchidos, altera os dois.
      configAPI
        .putUsuario( usuario )
        .then( () => { 
          $scope.usuario = {};
          return swal("Sucesso!", "Usuário e senha alterados com sucesso!", "success");
        })
        .catch( err => {
            swal("Opa...", "Houve um erro, tente novamente!", "error");
        })
    }
  };

  $scope.alterarUsuario = ( usuario ) => { return _putUsuario( usuario ) };
  $scope.usuario = {};
});