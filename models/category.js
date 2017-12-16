/*jslint node: true */
"use strict";

const bookshelf = require('../bookshelf');
const baseModel = require('../helpers/base-model');

let category = baseModel.extend({
    tableName: 'product_categories',
    update: function (fields, options) {
        return this.save(fields, options);
    },
});

module.exports = bookshelf.model('Category', category);