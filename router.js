/*jslint node: true */
"use strict";

const express = require('express');
const APIVersion = require('./api-version')();
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');



let router = function (app) {
    const routes = express.Router();

    routes.use('/category', categoryRoutes);
    routes.use('/product', productRoutes);
    

    routes.all('*', (req, res, next) =>
        res.json({
            error: {
                id: 1,
                message: "route not implemented",
            },
        }));
    app.use('/api/' + APIVersion, routes);
};

module.exports = router;