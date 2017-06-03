'use strict';

const path = require('path');
const express = require('express');
const consign = require('consign');
const morgan = require('morgan');
const logger = require('./../services/logger.js');

module.exports = function(){
  const app = express();
  app.set('views', path.join(__dirname, '../modules'))
//  app.set('view engine', 'jade');

  app.use(morgan('common', {
    stream: {
      write: function( mensagem ) {
        logger.info(mensagem);
      }
    }
  }));

  consign()
   .include('/app')
   .then('/services')
   .into(app);

  return app;
};