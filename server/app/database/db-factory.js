const pg = require('pg');
const connectionString = 'postgres://postgres:1234@localhost:5432/bd_sosnovavida';

module.exports = {  
    getConnection: function() {
        return conexao = pg.connect(connectionString);
    },
    // Query, parâmetros e callback
    query: function(text, values, cb) {

        // Chama a conexão do banco
        pg.connect(connectionString, function(err, client, done) {

            // Faz a chamada da query na conexão ativa
            client.query(text, values, function(err, result) {
                done();
                cb(err, result);
            })
        });
    }
};