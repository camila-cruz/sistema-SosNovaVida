module.exports = ( app ) => {
    app.get('/doadores', (req, res) => {
        console.log('Recebendo requisição GET em /doadores');
        let doadores = [{
            nome:'Yuri Cabral',
            tel_residencial: '(11)95334-2161',
            tel_celular: '(11)91234-5678',
            email:'ycabral@br.ibm.com'
        }];
        res.status(200).send(doadores);
    });

    app.get('/doadores/json', (req, res) => {
        console.log('Recebendo requisição GET em /doadores/json');
        let doadores = [{
            nome:'Yuri Cabral',
            tel_residencial: '(11)95334-2161',
            tel_celular: '(11)91234-5678',
            email:'ycabral@br.ibm.com'
        }];
        console.log(doadores);
        res.status(200).send(doadores);
    });

    app.get('/consultaDoador', (req, res) => {
        console.log('Recebendo requisição GET em /consultaDoador');
        console.log('Redirecionando para /consulta/doador');
        res.status(301).redirect('/consulta/doador');
    });

    app.get('/consulta/doador', ( req, res ) => {
        console.log('Recebendo requisição GET em /consulta/doador');
        res.render('consultaDoador');
    });

    app.get('/formDoador', (req, res) => {
        console.log('Recebendo requisição GET em /formDoador');
        console.log('Redirecionando para /cadastro/doador');
        res.status(301).redirect('/cadastro/doador');
    });
    
    app.get('/cadastro/doador', ( req, res ) => {
        console.log('Recebendo requisição GET em /cadastro/doador');
        res.render('formDoador');
    });
};