'use strict';

module.exports = ( req, res ) => {
    const fileName = req.params.name;
    if ( req.method == 'POST') {
        console.log('Recebendo requisição POST em /' + fileName);
    } else if (req.method == 'GET') {
        console.log('Recebendo requisição GET em /' + fileName);
    }
    const options = {
        root: __dirname + '/../public/',
        dotfiles: "deny",
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true,
            'TCC-Fatec': 'Sucesso!'
        }
    };

    res.sendFile( fileName, options, ( err ) => {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        } else {
            console.log('Sent:', fileName);
        }
    });
}