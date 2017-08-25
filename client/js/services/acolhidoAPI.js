//Padrão de projeto fábrica que se comunica com o BackEnd, externaliza o '''módulo''' acolhidoAPI
angular.module('novaVida').factory('acolhidoAPI', function( $http, config ) {
    const _getAcolhidos = () => {
        //realiza um get na urlBase (está configurada no arquivo /value/configValues.js)
        // urlbase + /acolhidos, ou seja: http://localhost:3000/acolhidos
        //Back-end está apto a receber requisições GET nesta URL.
        return $http.get( config.baseUrl + '/acolhidos' );
    };

    const _getPIA = ( id ) => {
        console.log("ID na api: " + id);
        return $http.get( config.baseUrl + '/acolhidos/pia/' + id);
    };
    
    const _setAcolhidos = () => {
        return $http.post( config.baseUrl + '/acolhidos' );
    };

    //Os métodos acima são acessados pelo retorno abaixo.
    return {
        // para acessar a função _getAcolhidos(), deve ser chamado getAcolhidos()
        // como é feito em config/routesConsulta.js
        getAcolhidos: _getAcolhidos,
        getPIA      : _getPIA,
        setAcolhidos: _setAcolhidos
    }
});