var app = require('./config/custom-express')();

app.listen(3000 , () => {
    console.log('Servidor up and running, escutando porta 3000 ;)');
})