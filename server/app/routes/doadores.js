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
                    if ( elemento.nome != 'Desconhecido' ) doadores.push(elemento);
                });

                return res.json(doadores);
                res.send(doadores).status(200);
            };
        });
    });

    app.get('/doadores/doacao/:nome', ( req, res ) => {
        const doador = req.params.nome;
        console.log('Recebendo requisição GET em /doadores/doacao/' + doador);

        con.query("SELECT id,nome FROM doador WHERE UPPER(nome) LIKE UPPER( $1 || '%')", [ doador ], ( err, result ) => {
            if ( err ) return res.send( err );

            return res.send( result.rows );
        })
    });

    app.get('/doadores/:id', (req, res) => {
        const id = req.params.id;
        console.log('Recebendo requisição GET em /doadores/' + id);
        // Get a Postgres client from the connection pool
        con.query('SELECT * FROM DOADOR WHERE id = $1;', [id], ( err, results ) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(results.rows[0]);
        });
    });

    app.post('/doadores', (req, res) => {
        console.log('Recebendo requisição POST em /doadores');
        const doador = req.body;
        //console.log(doador.uf.nome);

        //con.query('INSERT INTO DOADOR (nome, tel1, tel2, email, voluntario, financeiro, vestuario, alimenticio) values ($1, $2, $3, $4, $5, $6, $7, $8)',
        con.query('INSERT INTO DOADOR values (default, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)',
                  [ doador.nome, doador.tel1, doador.tel2, doador.email, doador.endereco, doador.numero, doador.complemento, doador.bairro, doador.cidade, doador.uf.nome, doador.voluntario, doador.financeiro, doador.vestuario, doador.alimenticio ], (err, result) => {
            
            if (err) {
                console.log(err.message);
                return res.status(500).json({success: false, data: err});
            }
            
            return res.sendStatus(200); //Status 200 - Created. O Front-end é responsável por fazer o resto.
        });
    });

    app.put('/doadores/:id', ( req, res ) => {
        const id = req.params.id;
        const doador = req.body;

        console.log('Recebendo requisição PUT em /doadores/' + id);

        con.query('UPDATE doador SET nome=$1, tel1=$2, tel2=$3, email=$4, voluntario=$5, financeiro=$6, vestuario=$7, alimenticio=$8 where id=$9',
                  [ doador.nome, doador.tel1, doador.tel2, doador.email, doador.voluntario, doador.financeiro, doador.vestuario, doador.alimenticio, id ], ( err, reuslt ) => {
            
            if ( err ) {
                console.log( err.message );
                return res.status(500).send( err );
            }

            return res.sendStatus(200);
        });
    });

    app.delete( '/doadores', ( req, res ) => {
        const doadores = req.body;

        doadores.forEach( doador => {
            con.query('DELETE FROM doador WHERE id=$1', [doador.id], ( err ) => {
                if( err ) return res.send(err);
            });
        });

        return res.sendStatus(200);
    });

};