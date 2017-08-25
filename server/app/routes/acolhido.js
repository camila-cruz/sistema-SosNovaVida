module.exports = ( app ) => {
    app.get('/acolhidos', (req, res) => {
        const acolhidos = [{
            id: 1,
            nome: 'Yuri',
            data_nasc: new Date(),
            local_nasc: 'SP',
            nome_mae: 'Joice',
            nome_pai: 'Gabriel'
        }];
        console.log('Recebendo requisição GET em /acolhidos');
        res.send(acolhidos).status(200);
    })

    app.get('/acolhidos/pia/:id', (req, res) => {
        let id = req.params.id;
        console.log("ID: " + id);
        const acolhido = {
            id: 1,
            nome: 'Yuri',
            data_nasc: new Date(),
            local_nasc: 'SP',
            nome_mae: 'Joice',
            nome_pai: 'Gabriel',
            imagem: "http://animais.culturamix.com/blog/wp-content/gallery/fotos-de-capivara-1/Fotos-Capivara-1.jpeg"
        };
        //res.json(acolhidos[id-1]);
        //res.json(acolhido);
        res.send(acolhido).status(200);
        //res.render('formPIA');
    });

}