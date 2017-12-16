/*jslint node: true */
'use strict';

const express = require('express');
const categoryController = require('../controllers/category');
const routes = express.Router();

routes.get('/', categoryController.findAll);
routes.get('/:id', categoryController.findOne);
routes.post('/', categoryController.create);
routes.put('/:id', categoryController.update);
routes.delete('/:id', categoryController.delete);

module.exports = routes;