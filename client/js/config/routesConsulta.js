/*
    Arquivo que guarda as rotas da aplicação
*/
angular.module('novaVida').config( function($routeProvider) {
    //quando a rota for /consulta/estoque
    $routeProvider.when('/consulta/estoque', {
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
                console.log('Testando acolhido');
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
            doador: (doadorAPI) => {
                return doadorAPI.getDoadores();
            }
        }
    });
    $routeProvider.when('/consulta/pia/acolhido/:id', {
        templateUrl: 'view/formPIA.html',
        controller: 'acolhidoCtrl',
        resolve: {
            acolhido: (acolhidoAPI, $route) => {
                console.log('Testando acolhido');
                return acolhidoAPI.getPIA( $route.current.params.id );
            }
        }
    })
});