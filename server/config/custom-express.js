const path = require('path');
const express = require('express');
const consign = require('consign');
const morgan = require('morgan');
const logger = require('./../services/logger.js');
const bodyParser = require('body-parser');

module.exports = function(){
  const app = express();
  //app.use(express.static(path.join(__dirname, 'public')));
  //console.log(path.join(__dirname, '../public'));
  
  // Declara qual a engine de renderização e o caminho dos arquivos publicos
  app.engine('.html', require('ejs').__express);
  app.set('views', path.join(__dirname, '../../client/view'));
  app.set('view engine', 'html');

  app.set('clientPath', path.join(__dirname, '../..', 'client'));
  
  app.use(express.static(app.get('clientPath')));
  app.use(bodyParser.json());

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // Grava as logs
  app.use(morgan('common', {
    stream: {
      write: function( mensagem ) {
        logger.info(mensagem);
      }
    }
  }));

  // Carrega os arquivos
  consign()
   .include('/app')
   .then('/services')
   .into(app);

  return app;
};