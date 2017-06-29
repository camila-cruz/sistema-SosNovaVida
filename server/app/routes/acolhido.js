module.exports = ( app ) => {
    app.get('/acolhidos', (req, res) => {
        const acolhidos = [{
            nome: 'Yuri',
            data_nasc: new Date(),
            local_nasc: 'SP',
            nome_mae: 'Joice',
            nome_pai: 'Gabriel'
        }];
        console.log('Recebendo requisição GET em /acolhidos');
        res.send(acolhidos).status(200);
    })

    app.get('/acolhidos/:id', (req, res) => {
        let id = req.params.id;
        res.render('formPIA');
    });

}