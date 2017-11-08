angular.module('novaVida').controller('estoqueCtrl', function( $scope, estoque, estoqueAPI ) {
    $scope.produtos = estoque.data;
    $scope.modoDeAbertura = "criar";
    $scope.selecionados = [];
    $scope.lista = {
        itens: []
    }

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

    $scope.criarLista = ( produtos ) => {
        $scope.modoDeAbertura = "criar";

        produtos.filter( ( produto ) => {
            if ( produto.selecionado ) {
                $scope.selecionados.push( produto );
                $scope.lista.itens.push( produto );
            }; 
        });

        console.log( $scope.selecionados );
    }

    $scope.salvarLista = () => console.log('Salvar lista.');

    $scope.adicionarItemNaLista = ( novoItem ) => {
        $scope.lista.itens.push( novoItem );
        $scope.novoItem = {};
    }
});