angular.module('novaVida').controller('acolhidoCtrl', function( $scope, acolhido, acolhidoAPI, uf ){ 
    $scope.acolhidos = acolhido.data;
    //$scope.ufs = uf.data;
    $scope.ufs = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];
    $scope.modoDeAbertura = "criar";

    $scope.carregarAcolhidos = () => {
        acolhidoAPI.getAcolhidos().then((response) => {
            console.log(response.data);
        }).catch((err) => {
            swal("Opa...", "Houve um erro, tente novamente!", "error");
            console.log("Erro no get: " + err.message);
        });
    };

    $scope.cadastrarAcolhido = (acolhido) => {
        console.log("Chegou na controller");
        acolhidoAPI.setAcolhidos(acolhido).then((response) => {
            swal("Sucesso!", "Acolhido cadastrado com sucesso!", "success"); 
            console.log("Sucesso");
        }).catch((err) => {
            swal("Opa...", "Houve um erro, tente novamente!", "error");
            console.log("O erro é: " + err);
        });
    };

    $scope.desativarAcolhido = (acolhido, estado) => {
        swal({
            title: 'Atenção',
            text: "Deseja realmente desativar este cadastro?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sim'
        }).then((result) => {
            if (result.value) {
                acolhidoAPI.setAcolhidoState(acolhido, estado).then((response) => {
                    swal("Sucesso!", "Cadastro desativado com sucesso!", "success"); 
                    console.log("Sucesso");
                    console.log(response.data)
                    $scope.acolhidos = response.data;
                }).catch((err) => {
                    swal("Opa...", "Houve um erro, tente novamente!", "error");
                    console.log("O erro é: " + err);
                });
            }
        });
    }

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
        console.log( 'Lista', lista);
        if ( $scope.modoDeAbertura === 'criar' ) {
            listaAPI.postListaEstoque( lista )
                .then( () => {
                    $scope.lista = {
                        produtos: []
                    }
                    return swal("Sucesso!", "Lista salva com sucesso!", "success");
                })
                .catch( err => {
                    swal("Opa...", "Houve um erro, tente novamente!", "error");
                    return console.log('Erro: ' + err );
                })
        } else {
            listaAPI.putListaEstoque(lista)
                .then(() => {
                    listaAPI.getListaEstoque()
                    .then( result => {
                        $scope.listas = result.data;
                        return swal("Sucesso!", "Lista editada com sucesso!", "success");
                    })
                    .catch( err => {
                        swal("Opa...", "Houve um erro, tente novamente!", "error");
                        console.log('Erro: ' + err );
                    })
                })
                .catch(err => {
                    swal("Opa...", "Houve um erro, tente novamente!", "error");
                    return console.log('Erro: ' + err);
                });
        };
    };

    $scope.apagarLista = ( lista ) => {
        swal({
            title: 'Atenção',
            text: "Deseja realmente excluir a lista selecionada?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sim'
        }).then( result => {
            if (result.value) {
                listaAPI.deleteListaEstoque( lista.id )
                    .then( () => {
                        listaAPI.getListaEstoque()
                        .then( result => {
                            $scope.listas = result.data;
                            return swal("Sucesso!", "Lista apagada com sucesso!", "success")
                        })
                        .catch( err => {
                            swal("Opa...", "Houve um erro, tente novamente!", "error");
                            console.log('Erro: ' + err );
                        })
                    })
                    .catch( err => {
                        swal("Opa...", "Houve um erro, tente novamente!", "error");
                        return console.log('Erro: ' + err );
                    });
            }
        });
    };

    ///////////////////////////////////////     LISTAS     \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    $scope.carregarListas = () => {
        listaAPI.getListaAcolhido()
           .then( result => {
                $scope.listas = result.data;
           })
           .catch( err => {
                swal("Opa...", "Houve um erro, tente novamente!", "error");
                console.log('Erro: ' + err );
           })
    };

    $scope.obterLista = ( lista ) => {
        $scope.lista.acolhidos = [];
        listaAPI.getListaAcolhidoById( lista.id )
            .then( result => {
                for ( i = 0; i <= result.data.acolhidos.length - 1; i++ ) {
                    $scope.lista.acolhidos.push({
                        nome: result.data.nome[i],
                        data_nasc: result.data.data_nasc[i],
                        camiseta: result.data.camiseta[i],
                        calca: result.data.calca[i],
                        intima: result.data.intima[i],
                        calcado: result.data.calcado[i]
                    });
                };
                $scope.lista.nome = result.data.nome;
                $scope.lista.id = lista.id;
                $scope.modoDeAbertura = 'editar';
            })
            .catch( err => {
                swal("Opa...", "Houve um erro, tente novamente!", "error");
                console.log('Erro: ' + err );
            })
    }

    $scope.adicionarItemNaLista = ( novoItem ) => {
        $scope.lista.acolhidos.push( novoItem );
        $scope.novoItem = {};
    };

    $scope.cancelarLista = () => {
        swal({
            title: 'Atenção',
            text: "Deseja realmente cancelar essa operação?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sim'
        }).then( result => {
            if (result.value) {
                $scope.lista = {};
            }
        });
    };

    $scope.removeItem = ( item ) => {
        $scope.lista.acolhidos = $scope.lista.acolhidos.filter( ( itemLista ) => {
            if ( itemLista.descricao !== item.descricao ) return itemLista; 
        })
    };
});