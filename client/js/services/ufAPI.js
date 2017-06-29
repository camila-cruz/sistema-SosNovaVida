angular.module('novaVida').factory('ufAPI', function( $http, config ){
    var _getUF = function() {
        return $http.get( config.baseUrl + '/uf' );
    };

    return {
        getUF: _getUF
    };

});