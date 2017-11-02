angular.module('novaVida').controller('estoqueCtrl', function( $scope, estoque, estoqueAPI ) {
    $scope.produtos = estoque.data;
    $scope.modoDeAbertura = "criar";

    $scope.movimentaEstoque = ( produto, metodo ) => {
        produto.metodo = metodo
        
        console.log( produto );
        estoqueAPI.putEstoque( produto )
          .then( result => {
              produto.qtd = result.data.qtd;
              produto.qtdAlterar = ''
            } )
          .catch( err => console.log(err) );

    }

    $scope.adicionaProduto = ( produto ) => {
        estoqueAPI.postEstoque( produto )
          .then(   () => {
              atualizaProdutos()
              $scope.novoProduto = '';
            } )
          .catch( err => console.log('Erro: ' + err ) );
    }

    const atualizaProdutos = () => {
        estoqueAPI.getEstoque().then( results => $scope.produtos = results.data );
    }
});