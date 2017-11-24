angular.module('novaVida').controller('estoqueCtrl', function( $scope, estoque, estoqueAPI ) {
    $scope.produtos = estoque.data;
    $scope.modoDeAbertura = "criar";
    $scope.selecionados = [];
    $scope.lista = {
        itens: []
    }
    $scope.produto = {};

    $scope.movimentaEstoque = ( produto, metodo ) => {
        produto.metodo = metodo
        
        if ( produto.qtdAlterar < 1 ) {
            produto.qtdAlterar = 1;
            return alert('Valor deve ser maior do que 1.', 'AE');
        }

        estoqueAPI.putEstoque( produto )
          .then( result => {
              produto.qtd = result.data.qtd;
              produto.qtdAlterar = '1'
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
        $scope.lista = {
            itens: []
        }

        produtos.filter( ( produto ) => {
            if ( produto.selecionado ) {
                $scope.lista.itens.push( produto );
            }; 
        });
    }

    $scope.salvarLista = () => console.log('Salvar lista.');

    $scope.adicionarItemNaLista = ( novoItem ) => {
        $scope.lista.itens.push( novoItem );
        $scope.novoItem = {};
    }

    $scope.cancelarLista = () => {
        $scope.lista = {};
    };

    $scope.removeItem = ( item ) => {
        $scope.lista.itens = $scope.lista.itens.filter( ( itemLista ) => {
            if ( itemLista.descricao !== item.descricao ) return itemLista; 
        })
    }

});