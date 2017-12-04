angular.module('novaVida').controller('estoqueCtrl', function( $scope, estoque, estoqueAPI, listaAPI ) {
    $scope.produtos = estoque.data;
    $scope.modoDeAbertura = "criar";
    $scope.selecionados = [];
    $scope.lista = {
        produtos: []
    }
    $scope.produto = {};

    $scope.ordenarPor = ( campo ) => {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao
    };

    $scope.movimentaEstoque = ( produto, metodo ) => {
        produto.metodo = metodo
        if ( produto.qtdAlterar <= 0 ) return swal("Atenção", "A quantidade inserida deve ser maior que 0", "warning");

        if ( produto.metodo === -1 && produto.qtd - parseInt(produto.qtdAlterar) < 0 ) {
            return swal("Atenção", "Quantidade de saída maior do que a disponível em estoque", "warning");
        }

        estoqueAPI.putEstoque( produto )
            .then( result => {
                produto.qtd = result.data.qtd;
                produto.qtdAlterar = '1'
            })
            .catch( err => {
                swal("Opa...", "Houve um erro, tente novamente!", "error");
                console.log(err)
            });

    };

    $scope.adicionaProduto = ( produto ) => {
        if ( produto.descricao === '' ) {
            return swal("Atenção", "O nome do produto não pode ser deixado em branco!", "warning");
        }
        estoqueAPI.postEstoque( produto )
            .then(   () => {
                atualizaProdutos()
                $scope.novoProduto = '';
            } )
            .catch( err => {
                swal("Opa...", "Houve um erro, tente novamente!", "error");
                console.log('Erro: ' + err )
            });
    };

    const atualizaProdutos = () => {
        estoqueAPI.getEstoque().then( results => $scope.produtos = results.data );
    };

    $scope.criarLista = ( produtos ) => {
        $scope.modoDeAbertura = "criar";
        $scope.lista = {
            produtos: []
        }

        produtos.filter( ( produto ) => {
            if ( produto.selecionado ) {
                $scope.lista.produtos.push( produto );
            }; 
        });
    };

    $scope.salvarLista = ( lista ) => {
        listaAPI.postListaEstoque( lista )
        .then( () => {
            return swal("Sucesso!", "Lista salva com sucesso!", "success");
        })
        .catch( err => {
            swal("Opa...", "Houve um erro, tente novamente!", "error");
            console.log('Erro: ' + err );
        })
    };

    $scope.carregarListas = () => {
        listaAPI.getListaEstoque()
           .then( result => {
                $scope.listas = result.data;
           })
           .catch( err => {
                swal("Opa...", "Houve um erro, tente novamente!", "error");
                console.log('Erro: ' + err );
           })
    };

    $scope.obterLista = ( id ) => {
        listaAPI.getListaEstoqueById( id )
            .then( result => {
                console.log('Data:', result.data);
                $scope.lista = result.data;
            })
            .catch( err => {
                swal("Opa...", "Houve um erro, tente novamente!", "error");
                console.log('Erro: ' + err );
            })
        $scope.modoDeAbertura = 'editar';
    }

    $scope.adicionarItemNaLista = ( novoItem ) => {
        $scope.lista.produtos.push( novoItem );
        $scope.novoItem = {};
    };

    $scope.cancelarLista = () => {
        // Adicionar rotina de confirmação
        $scope.lista = {};
    };

    $scope.removeItem = ( item ) => {
        $scope.lista.produtos = $scope.lista.produtos.filter( ( itemLista ) => {
            if ( itemLista.descricao !== item.descricao ) return itemLista; 
        })
    };

});