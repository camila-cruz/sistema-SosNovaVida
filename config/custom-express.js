var express = require('express');
var consign = require('consign');
var morgan = require('morgan');
var logger = require('./../services/logger.js');

module.exports = function(){
  var app = express();

  app.use(morgan('common', {
    stream: {
      write: function( mensagem ) {
        logger.info(mensagem);
      }
    }
  }));

  consign()
   .include('controllers')
   .then('services')
   .then('views')
   .into(app);

  return app;
};