const path = require('path');
const express = require('express');
const consign = require('consign');
const morgan = require('morgan');
const logger = require('./../services/logger.js');
const bodyParser = require('body-parser');

module.exports = function(){
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
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
  //.include('/app/models')
   .include('/app/routes')
   .then('/app')
   .then('/services')
   .into(app);

  return app;
};