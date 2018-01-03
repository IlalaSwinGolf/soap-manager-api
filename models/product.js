/*jslint node: true */
"use strict";

const bookshelf = require('../bookshelf');
const baseModel = require('../helpers/base-model');

let product = baseModel.extend({
    tableName: 'products',
    update: function (fields, options) {
        return this.save(fields, options);
    },
});

module.exports = bookshelf.model('Product', product);