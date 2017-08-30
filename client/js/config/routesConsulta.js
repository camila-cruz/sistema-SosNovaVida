/*
    Arquivo que guarda as rotas da aplicação
*/
angular.module('novaVida').config( ($routeProvider) => {
    //quando a rota for /estoque
    $routeProvider.when('/estoque', {
        //carregará a view localizada na url abaixo
        templateUrl: 'view/consultaEstoque.html',
        //o controller da view será estoqueCtrl, declarado no arquivo /controllers/estoqueCtrl
        controller: 'estoqueCtrl',
        //porém, só irá realizar todo o acima somente após a condição abaixo ser realizada, ou seja
        // é um pré-requisito
        resolve: {
            // este nome 'estoque' é o nome do que deve ser injetado no controller
            estoque: (estoqueAPI) => {
                console.log('Testando!');
                //aqui é invocado o método _getEstoque() de estoqueAPI.
                return estoqueAPI.getEstoque();
            }
        }
    });
    $routeProvider.when('/consulta/acolhido', {
        templateUrl: 'view/consultaAcolhido.html',
        controller: 'acolhidoCtrl',
        resolve: {
            acolhido: (acolhidoAPI) => {
                return acolhidoAPI.getAcolhidos();
            },
            uf: (ufAPI) => {
                return ufAPI;
            }
        }
    });
    $routeProvider.when('/consulta/doador', {
        templateUrl: 'view/consultaDoador.html',
        controller: 'doadorCtrl',
        resolve: {
            doadorAPI: (doadorAPI) => {
                return doadorAPI.getDoadores();
            },
            uf: (ufAPI) => {
                return ufAPI;
            }
        }
    });
    $routeProvider.when('/consulta/doador/:id', {
        templateUrl: 'view/detalhesDoador.html',
        controller: 'detalhesDoadorCtrl',
        resolve: {
            doadorAPI: (doadorAPI, $route) => {
                console.log($route.current.params.id);
                return doadorAPI.getDoadorById( $route.current.params.id );
            },
            uf: (ufAPI) => {
                return ufAPI.getUF();
            }
        }
    });
    $routeProvider.when('/consulta/acolhido/pia/:id', {
        templateUrl: 'view/formPIA.html',
        controller: 'piaCtrl',      //acolhidoCtrl
        resolve: {
            acolhido: (acolhidoAPI, $route) => {
                console.log('Testando pia acolhido');
                return acolhidoAPI.getPIA( $route.current.params.id );
            },
            uf: ( ufAPI ) => {
                return ufAPI;
            }
        }
    })
});