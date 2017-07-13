module.exports = ( app ) => {
    let doadores = [{
            id: 1,
            nome:'Yuri Cabral',
            telRes: '(11)95334-2161',
            telCel: '(11)91234-5678',
            email:'ycabral@br.ibm.com'
        }];

    app.get('/doadores', (req, res) => {
        console.log('Recebendo requisição GET em /doadores');
        res.status(200).send(doadores);
    });

    app.get('/doadores/:id', (req, res) => {
        id = req.params.id;
        console.log('Buscando doador com ID ' + id);
        res.send(doadores.find( (id) => { return id;} ));
    });

    app.post('/doadores', (req, res) => {
        console.log('Recebendo requisição POST em /doadores');
        let doador = req.body;
        console.log(doador)
        doadores.push(doador);
        console.log(doadores)
        res.status(201).send(doador);
    });

};