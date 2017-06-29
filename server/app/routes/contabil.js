module.exports = ( app ) => {

    const movimentacoes = [{
        id: 1,
        descricao: 'Conta de Luz',
        dtMov: new Date(),
        tipoMov: 'Saída',
        valMov: 200.00,
        saldo: 1528.54
    }, {
        id: 2,
        descricao: 'Conta de Água',
        dtMov: new Date(),
        tipoMov: 'Saída',
        valMov: 220.00,
        saldo: 1308.54
    }, {
        id: 3,
        descricao: 'Doação',
        dtMov: new Date(),
        tipoMov: 'Entrada',
        valMov: 220.00,
        saldo: 1528.54
    }, {
        id: 4,
        descricao: 'Bingo beneficente',
        dtMov: new Date(),
        tipoMov: 'Entrada',
        valMov: 220.00,
        saldo: 1748.54
    }];

    app.get('/contabil', (req, res) => {
        console.log('Recebendo requisição GET em /contabil');
        res.send(movimentacoes).status(200);
    });
};