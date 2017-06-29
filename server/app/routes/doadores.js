module.exports = ( app ) => {
    let doadores = [{
            nome:'Yuri Cabral',
            telRes: '(11)95334-2161',
            telCel: '(11)91234-5678',
            email:'ycabral@br.ibm.com'
        }];

    app.get('/doadores', (req, res) => {
        console.log('Recebendo requisição GET em /doadores');
        res.status(200).send(doadores);
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