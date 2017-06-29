var app = require('./www/express-config')();

app.listen(3000 , () => {
    console.log('Servidor up and running, escutando porta 3000.');
})