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

router(app);
server.listen(port);