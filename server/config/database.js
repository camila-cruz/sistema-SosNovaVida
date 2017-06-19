module.exports = () => {
    var mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost:27014');

    mongoose.connection.on('connected', () => {
        console.log('Conectado ao MongoDB')
    });

    mongoose.connection.on('error', ( err ) => {
        console.log('Erro na conexão: ' + err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Desconectado do MongoDB.');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close( () => {
            console.log('Aplicação terminada, conexão fechada.')
            process.exit(0);
        });
    });

};