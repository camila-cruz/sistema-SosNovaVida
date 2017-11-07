const path = require('path');
const conn = require('../database/db-factory');

module.exports = (app) => {
    app.get('/movimentacao', (req, res, next) => {
        console.log('Recebendo requisicao GET em /movimentacao');
        const movimentacoes = [];
        
        conn.query('SELECT * FROM movimentacao', null, (err, result) => {
            if (err) {
                return res.json(movimentacoes);
                res.send(movimentacoes).status(200);
            }
            result.rows.forEach( linha => movimentacoes.push( linha ) );

            res.json(movimentacoes).status(200);

        });

    });
}