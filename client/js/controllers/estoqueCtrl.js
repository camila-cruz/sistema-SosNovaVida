angular.module('novaVida').controller('estoqueCtrl', function( $scope, estoque, estoqueAPI ) {
    $scope.produtos = estoque.data;
    $scope.modoDeAbertura = "criar";
    $scope.selecionados = [];
    $scope.lista = {
        itens: []
    };

    $scope.ordenarPor = ( campo ) => {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao
    };

    $scope.movimentaEstoque = ( produto, metodo ) => {
        produto.metodo = metodo
        console.log( 'Produto', produto );
        if ( produto.metodo === -1 && produto.qtd - parseInt(produto.qtdAlterar) < 0 ) return alert('Operação não permitida.\nQuantidade de saída maior do que quantidade atual em estoque.')

        estoqueAPI.putEstoque( produto )
          .then( result => {
              produto.qtd = result.data.qtd;
              produto.qtdAlterar = ''
            } )
          .catch( err => console.log(err) );

    };

    $scope.adicionaProduto = ( produto ) => {
        estoqueAPI.postEstoque( produto )
          .then(   () => {
              atualizaProdutos()
              $scope.novoProduto = '';
            } )
          .catch( err => console.log('Erro: ' + err ) );
    };

    const atualizaProdutos = () => {
        estoqueAPI.getEstoque().then( results => $scope.produtos = results.data );
    };

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
    };

    $scope.salvarLista = () => console.log('Salvar lista.');

    $scope.adicionarItemNaLista = ( novoItem ) => {
        $scope.lista.itens.push( novoItem );
        $scope.novoItem = {};
    };

    $scope.cancelarLista = () => {
        $scope.lista = {};
    };

    $scope.removeItem = ( item ) => {
        $scope.lista.itens = $scope.lista.itens.filter( ( itemLista ) => {
            console.log('Descricao do item na lista', itemLista.descricao );
            console.log('Item selecionado', item.descricao);
            if ( itemLista.descricao !== item.descricao ) return itemLista ; 
        })
    };

});