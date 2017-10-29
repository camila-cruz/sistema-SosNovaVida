const path = require('path');

module.exports = (app) => {
    app.get('/movimentacao', (req, res, next) => {
        const movimentacoes = [];
        return res.json(movimentacoes);
        //res.send(acolhidos).status(200);
    });
}