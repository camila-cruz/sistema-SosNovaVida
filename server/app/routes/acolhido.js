//const pg = require('pg');
const path = require('path');
const con = require('../database/db-factory.js');
//const connectionString = process.env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/tcc';

module.exports = ( app ) => {
    app.get('/acolhidos', (req, res, next) => {
        console.log('Recebendo requisição GET em /acolhidos');
        const acolhidos = [];

        try {
            con.query('SELECT * FROM acolhido ORDER BY ativo DESC, id ASC;', null, function(err, result){
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

        console.log('Recebendo requisição GET em /acolhidos/' + id);
        // Get a Postgres client from the connection pool
        con.query('SELECT * FROM acolhido WHERE id = $1;', [id], ( err, results ) => {
            if (err) return res.status(500).send(err);
            else {
                //console.log(results.rows[0]);
                acolhido = results.rows[0];
                acolhido.data_nasc = new Date(acolhido.data_nasc);

                con.query('SELECT * FROM residencia WHERE id_acolhido = $1;', [id], ( err, results ) => {
                    if (err) return res.status(500).send(err);
                    else {
                        acolhido.residencia = results.rows[0];
        
                        con.query('SELECT * FROM trabalho WHERE id_acolhido = $1;', [id], ( err, results ) => {
                            if (err) return res.status(500).send(err);
                            else {
                                acolhido.trabalho = results.rows[0];

                                con.query('SELECT * FROM acolhido WHERE id_responsavel = $1;', [id], ( err, results ) => {
                                    if (err) return res.status(500).send(err);
                                    else {
                                        acolhido.dependente = results.rows[0];  

                                        con.query('SELECT * FROM juridico WHERE id_acolhido = $1;', [id], ( err, results ) => {
                                            if (err) return res.status(500).send(err);
                                            else {
                                                acolhido.juridico = results.rows[0];  
                                                console.log(acolhido);
                                                //console.log(acolhido.juridico.processo)
                                                return res.status(200).send(acolhido);
                                            }
                                        });
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
                                [acolhido.cep, acolhido.endereco, acolhido.numero, acolhido.compl, acolhido.bairro, acolhido.cidade, acolhido.uf], function (err, result) {
                        if (err) {
                            console.log("Residencia" + err.message);
                            console.log(err);
                            // Retorna erro que vira alert
                            return res.status(500).json({success: false, data: err});
                        }
                        else {
                            con.query('INSERT INTO trabalho (empresa, cargo, salario, cep, logradouro, numero, complemento, bairro, cidade, uf, id_acolhido) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, (SELECT MAX(ID) FROM ACOLHIDO))', 
                                [acolhido.trabalho.empresa, acolhido.trabalho.cargo, acolhido.trabalho.salario, acolhido.trabalho.cep, acolhido.trabalho.endereco,
                                     acolhido.trabalho.numero, acolhido.trabalho.compl, acolhido.trabalho.bairro, acolhido.trabalho.cidade, acolhido.trabalho.uf], function (err, result) {
                                if (err) {
                                    console.log("Trabalho" + err.message);
                                    console.log(err);
                                    // Retorna erro que vira alert
                                    return res.status(500).json({success: false, data: err});
                                }
                                else {
                                    con.query('INSERT INTO acolhido (nome, data_nasc, cpf, rg, ssp, nome_mae, nome_pai, alergias, sangue,' + 
                                        'qtd_aborto, renda, camiseta, calca, intima, calcado, id_responsavel) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, ' + 
                                        '$11, $12, $13, $14, $15, (SELECT MAX(ID) FROM ACOLHIDO))',
                                        [acolhido.dependente.nome, acolhido.dependente.dataNasc, acolhido.dependente.cpf, acolhido.dependente.rg, 
                                            acolhido.dependente.ssp, acolhido.dependente.nomeMae, acolhido.dependente.nomePai, acolhido.dependente.alergias, 
                                            acolhido.dependente.tipoSanguineo, acolhido.dependente.qtdAborto, acolhido.dependente.renda,
                                            acolhido.dependente.camiseta, acolhido.dependente.calca, acolhido.dependente.intima, acolhido.dependente.calcado], function (err, result) {
                                        if (err) {
                                            console.log("Dependente" + err.message);
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

    app.put('/acolhidos/:id', (req, res, next) => {
        const acolhido = req.body;
        console.log(req.body);
        console.log("data.nome: " + acolhido.nome);

        try {
            con.query('UPDATE acolhido SET (nome=$1, data_nasc=$2, data_entrada=$3, cpf=$4, rg=$5, ssp=$6, nome_mae=$7, nome_pai=$8, alergias=$9, sangue=$10,' + 
                        'qtd_aborto=$11, renda=$12, camiseta=$13, calca=$14, intima=$15, calcado=$16) WHERE id=$17',
                        [acolhido.nome, acolhido.data_nasc, acolhido.data_entrada, acolhido.cpf, acolhido.rg, acolhido.ssp, acolhido.nome_mae,
                        acolhido.nome_pai, acolhido.alergias, acolhido.sangue, acolhido.qtd_aborto, acolhido.renda,
                        acolhido.camiseta, acolhido.calca, acolhido.intima, acolhido.calcado, id], function (err, result) {
                if (err) {
                    console.log(err.message);
                    console.log(err);
                    // Retorna erro que vira alert
                    return res.status(500).json({success: false, data: err});
                } else {
                    con.query('UPDATE residencia SET (cep=$1, logradouro=$2, numero=$3, complemento=$4, bairro=$5, cidade=$6, uf=$7,' +
                        'id_acolhido=(SELECT MAX(ID) FROM ACOLHIDO) WHERE id=$8', 
                        [acolhido.cep, acolhido.endereco, acolhido.numero, acolhido.compl, acolhido.bairro, acolhido.cidade,
                        acolhido.uf, id], function (err, result) {
                        if (err) {
                            console.log("Residencia" + err.message);
                            console.log(err);
                            // Retorna erro que vira alert
                            return res.status(500).json({success: false, data: err});
                        }
                        else {
                            con.query('UPDATE trabalho (empresa=$1, cargo=$2, salario=$3, cep=$4, logradouro=$5, numero=$6, complemento=$7, bairro=$8, cidade=$9, uf=$10, id_acolhido=$(SELECT MAX(ID) FROM ACOLHIDO)', 
                                [acolhido.empresa, acolhido.cargo, acolhido.salario, acolhido.Tcep, acolhido.Tendereco,
                                     acolhido.Tnumero, acolhido.Tcompl, acolhido.Tbairro, acolhido.Tcidade, acolhido.Tuf], function (err, result) {
                                if (err) {
                                    console.log("Trabalho" + err.message);
                                    console.log(err);
                                    // Retorna erro que vira alert
                                    return res.status(500).json({success: false, data: err});
                                }
                                else {
                                    con.query('UPDATE acolhido SET (nome=$1, data_nasc=$2, cpf=$5, rg=$6, ssp=$7, nome_mae=$8, nome_pai=$9, alergias=$10, sangue=$11,' + 
                                    'qtd_aborto=$12, renda=$13, camiseta=$14, calca=$15, intima=$16, calcado=$17) WHERE id_responsavel=$18',
                                        [acolhido.dependente.nome, acolhido.dependente.data_nasc, acolhido.dependente.cpf, acolhido.dependente.rg, 
                                            acolhido.dependente.ssp, acolhido.dependente.nome_mae, acolhido.dependente.nome_pai, acolhido.dependente.alergias, 
                                            acolhido.dependente.sangue, acolhido.dependente.qtd_aborto, acolhido.dependente.renda,
                                            acolhido.dependente.camiseta, acolhido.dependente.calca, acolhido.dependente.intima, acolhido.dependente.calcado, id], function (err, result) {
                                        if (err) {
                                            console.log("Dependente" + err.message);
                                            console.log(err);
                                            // Retorna erro que vira alert
                                            return res.status(500).json({success: false, data: err});
                                        }
                                        else {
                                            con.query('UPDATE juridico SET (processo=$1, comarca=$2, nro_vara=$3, vara=$4, id_acolhido=(SELECT MAX(ID) FROM ACOLHIDO)', 
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

        estado = estado == 1? true:false;

        con.query("UPDATE acolhido SET ativo=$1 WHERE id=$2", [estado, acolhido.id], (err) => {
            if (err) {
                return res.status(500).json({success: false, data: err});
            }
            else {
                con.query("SELECT * FROM acolhido WHERE ativo=true", [], (err, result) => {
                    if (err) {
                        return res.status(500).json({success: false, data: err});
                    }
                    else {
                        return res.status(200).send(result.rows);
                    }
                });
            }
        });        
    });

}