const con = require('../database/db-factory');

module.exports = ( app ) => {

    app.get('/doadores', (req, res) => {
        console.log('Recebendo requisição GET em /doadores');
        const doadores = [];

        con.query('SELECT * FROM DOADOR ORDER BY id ASC;', null, function(err, result){
            if (err) {
                console.log(err.message);
                //return res.status(500).json({success: false, data: err});

                // Renderiza a página corretamente apesar do erro
                return res.json(doadores);
                res.send(doadores).status(200);
            } else {

                result.rows.forEach( (elemento) => {
                    doadores.push(elemento);
                });

                return res.json(doadores);
                res.send(doadores).status(200);
            };
        });
    });

    app.get('/doadores/:id', (req, res) => {
        let id = req.params.id;
        console.log('Recebendo requisição GET em /doadores/' + id);
        // Get a Postgres client from the connection pool
        con.query('SELECT * FROM DOADOR WHERE id = $1;', [id], ( err, results ) => {
            if (err) return res.status(500).send(err);

            console.log( results.rows[0]);
            return res.status(200).send(results.rows[0]);
        });
    });

    app.post('/doadores', (req, res) => {
        const data = req.body;

        con.query('INSERT INTO DOADOR (nome, tel1, tel2, email, voluntario, financeiro, vestuario, alimenticio) values ($1, $2, $3, $4, $5, $6, $7, $8)',
                [], function (err, result) {
            
            if (err) {
                console.log(err.message);
                return res.status(500).json({success: false, data: err});
            } else {
                // Fazer algo
                return res.status(200); //Status 200 - Created. O Front-end é responsável por fazer o resto.
            };
        });
        // Falta um return
    });

};