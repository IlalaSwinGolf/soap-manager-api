/*jslint node: true */
'use strict';

const bookshelf = require('../bookshelf');

let baseModel = bookshelf.Model.extend({
    hasTimestamps: true,
}, {
    findAll: function (filter, options) {
        return this.forge().where(filter).fetchAll(options);
    },

    findOne: function (query, options) {
        return this.forge(query).refresh(options);
    },

    create: function (data, options) {
        return this.forge(data).save(null, options);
    },
});

module.exports = bookshelf.model('BaseModel', baseModel);