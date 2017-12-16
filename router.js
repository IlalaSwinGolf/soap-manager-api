/*jslint node: true */
"use strict";

const express = require('express');
const APIVersion = require('./api-version')();

let router = function (app) {
    const routes = express.Router();
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