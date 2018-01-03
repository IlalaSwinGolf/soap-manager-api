/*jslint node: true */
'use strict';

const express = require('express');
const productController = require('../controllers/product');
const routes = express.Router();

routes.get('/', productController.findAll);
routes.get('/:id', productController.findOne);
routes.post('/', productController.create);
routes.put('/:id', productController.update);
routes.delete('/:id', productController.delete);

module.exports = routes;