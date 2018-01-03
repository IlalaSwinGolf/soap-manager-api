/*jslint node: true */
"use strict";

const bookshelf = require('../bookshelf');
const baseModel = require('../helpers/base-model');

let category = baseModel.extend({
    tableName: 'product_categories',
    update: function (fields, options) {
        return this.save(fields, options);
    },
    products: function () {
            return this.hasMany('Product', 'category_id');
    }
});

module.exports = bookshelf.model('Category', category);