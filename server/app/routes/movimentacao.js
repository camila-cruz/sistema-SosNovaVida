const path = require('path');
const conn = require('../database/db-factory');

module.exports = (app) => {
    app.get('/movimentacao', (req, res, next) => {
        console.log('Recebendo requisicao GET em /movimentacao');
        const movimentacoes = [];
        
        conn.query('SELECT * FROM movimentacao', null, (err, result) => {
            if (err) {
                return 'Ocorreu um erro: ' + err;
            }
            result.rows.forEach( linha => movimentacoes.push( linha ) );

            res.json(movimentacoes).status(200);

        });

    });
}