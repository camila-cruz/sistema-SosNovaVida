angular.module('novaVida').factory('doadorAPI', function( $http, config ) {
    const _getDoadores = () => {
        return $http.get( config.baseUrl + '/doadores' );
    };

    const _getDoadorById = (id ) => {
        return $http.get( config.baseUrl + '/doadores/' + id);
    };

    const _getDoadorByNome = ( nome ) => {
        return $http.get( config.baseUrl + '/doadores/doacao/' + nome);
    };

    const _postDoador = ( doador ) => {
        return $http.post( config.baseUrl + '/doadores', doador );
    }

    const _putDoador = ( doador, id ) => {
        return $http.put( config.baseUrl + '/doadores/' + id, doador );
    }

    const _deleteDoador = ( doadores ) => {
        return $http.delete( config.baseUrl + '/doadores', { data: doadores , headers: { 'Content-type': 'application/json;charset=utf-8' } } );
    }

    return {
        getDoadores: _getDoadores,
        getDoadorById: _getDoadorById,
        getDoadorByNome: _getDoadorByNome,
        postDoador: _postDoador,
        putDoador: _putDoador,
        deleteDoador: _deleteDoador
    };
});