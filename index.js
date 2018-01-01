/*jslint node: true */
"use strict";

const http = require('http');
const port = parseInt(process.env.PORT, 10) || 8000;

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const router = require('./router');
const app = express();
const server = http.createServer(app);

app.use(logger(process.env.LOG_LEVEL || 'dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    next();
  });

router(app);
server.listen(port);