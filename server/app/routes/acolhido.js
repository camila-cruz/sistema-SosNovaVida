//const pg = require('pg');
const path = require('path');
const con = require('../database/db-factory.js');
//const connectionString = process.env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/tcc';

module.exports = ( app ) => {
    app.get('/acolhidos', (req, res, next) => {
        console.log('Recebendo requisição GET em /acolhidos');
        const acolhidos = [];

        try {
            con.query('SELECT * FROM acolhido ORDER BY id ASC;', null, function(err, result){
                if (err) {
                    console.log(err.message);
                    //return res.status(500).json({success: false, data: err});

                    // Renderiza a página corretamente apesar do erro
                    return res.json(acolhidos);
                    res.send(acolhidos).status(200);
                } else {
                    result.rows.forEach( (elemento) => {
                        acolhidos.push(elemento);
                    });
                    //let linhas = result.rows[0];
                    //acolhidos.push(linhas);
                    console.log(acolhidos);
                    return res.json(acolhidos);
                    res.send(acolhidos).status(200);
                };
            });
        }
        catch (err) {
            return res.json(acolhidos);
            res.send(acolhidos).status(200);
        }
    });
    
    app.get('/acolhidos/:id', (req, res) => {
        let id = req.params.id;
        let acolhido;
        let residencia;
        let trabalho;
        let juridico;

        console.log('Recebendo requisição GET em /acolhidos/' + id);
        // Get a Postgres client from the connection pool
        con.query('SELECT * FROM acolhido WHERE id = $1;', [id], ( err, results ) => {
            if (err) return res.status(500).send(err);
            else {
                //console.log(results.rows[0]);
                acolhido = results.rows[0];

                con.query('SELECT * FROM residencia WHERE id_acolhido = $1;', [id], ( err, results ) => {
                    if (err) return res.status(500).send(err);
                    else {
                        acolhido.residencia = results.rows[0];
        
                        con.query('SELECT * FROM trabalho WHERE id_acolhido = $1;', [id], ( err, results ) => {
                            if (err) return res.status(500).send(err);
                            else {
                                acolhido.trabalho = results.rows[0];

                                con.query('SELECT * FROM juridico WHERE id_acolhido = $1;', [id], ( err, results ) => {
                                    if (err) return res.status(500).send(err);
                                    else {
                                        acolhido.juridico = results.rows[0];  
                                        return res.status(200).send(acolhido);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });

    app.post('/acolhidos', (req, res, next) => {
        const acolhido = req.body;
        console.log(req.body);
        console.log("data.nome: " + acolhido.nome);

        try {
            con.query('INSERT INTO acolhido (nome, data_nasc, data_entrada, cpf, rg, ssp, nome_mae, nome_pai, alergias, sangue,' + 
                        'qtd_aborto, renda, camiseta, calca, intima, calcado) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, ' + 
                        '$11, $12, $13, $14, $15, $16)',
                        [acolhido.nome, acolhido.dataNasc, acolhido.dataEntrada, acolhido.cpf, acolhido.rg, acolhido.ssp, acolhido.nomeMae,
                        acolhido.nomePai, acolhido.alergias, acolhido.tipoSanguineo, acolhido.qtdAborto, acolhido.renda,
                        acolhido.camiseta, acolhido.calca, acolhido.intima, acolhido.calcado], function (err, result) {
                if (err) {
                    console.log(err.message);
                    console.log(err);
                    // Retorna erro que vira alert
                    return res.status(500).json({success: false, data: err});
                } else {
                    con.query('INSERT INTO residencia (cep, logradouro, numero, complemento, bairro, cidade, uf, id_acolhido) values ($1, $2, $3, $4, $5, $6, $7, (SELECT MAX(ID) FROM ACOLHIDO))', 
                                [acolhido.cep, acolhido.endereco, acolhido.numero, acolhido.compl, acolhido.bairro, acolhido.cidade, acolhido.uf.nome], function (err, result) {
                        if (err) {
                            console.log("Residencia" + err.message);
                            console.log(err);
                            // Retorna erro que vira alert
                            return res.status(500).json({success: false, data: err});
                        }
                        else {
                            con.query('INSERT INTO trabalho (empresa, cargo, salario, cep, logradouro, numero, complemento, bairro, cidade, uf, id_acolhido) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, (SELECT MAX(ID) FROM ACOLHIDO))', 
                                [acolhido.trabalho.empresa, acolhido.trabalho.cargo, acolhido.trabalho.salario, acolhido.trabalho.cep, acolhido.trabalho.endereco,
                                     acolhido.trabalho.numero, acolhido.trabalho.compl, acolhido.trabalho.bairro, acolhido.trabalho.cidade, acolhido.trabalho.uf.nome], function (err, result) {
                                if (err) {
                                    console.log("Trabalho" + err.message);
                                    console.log(err);
                                    // Retorna erro que vira alert
                                    return res.status(500).json({success: false, data: err});
                                }
                                else {
                                    con.query('INSERT INTO juridico (processo, comarca, nro_vara, vara, id_acolhido) values ($1, $2, $3, $4, (SELECT MAX(ID) FROM ACOLHIDO))', 
                                        [acolhido.processo, acolhido.comarca, acolhido.numVara, acolhido.vara], function (err, result) {
                                        if (err) {
                                            console.log("Juridico" + err.message);
                                            console.log(err);
                                            // Retorna erro que vira alert
                                            return res.status(500).json({success: false, data: err});
                                        }
                                        else {
                                            return res.sendStatus(200); //Status 200 - Created. O Front-end é responsável por fazer o resto.
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
        catch (err) {
            console.log(err.message);
            // Retorna erro que vira alert
            return res.status(500).json({success: false, data: err});
        }
        // Fazer algo
        // Falta um return
    });


    app.post('/acolhidos/:estado', (req, res, next) => {
        let estado = req.params.estado;
        let acolhido = req.body;

        con.query("UPDATE acolhido SET ativo=$1 WHERE id=$2", [estado, acolhido.id], (err) => {
            if (err) {
                return res.status(500).json({success: false, data: err});
            }
            else {
                con.query("SELECT * FROM acolhido WHERE ativo=1", (err, result) => {
                    if (err) {
                        return res.status(500).json({success: false, data: err});
                    }
                    else {
                        return res.statos(200).send(result.rows);
                    }
                });
            }
        });        
    });

}