/*jslint node: true */
'use strict';

const promise = require('bluebird');
const Product = require('../models/product');

module.exports = {

    findAll: (req, res, next) => {
        promise.coroutine(function* () {
            try {
                const categories = yield Product.findAll(req.query, {});
                res.status(200).json({
                    success: true,
                    data: categories
                });
            } catch (err) {
                res.status(500).json({
                    success: false,
                    data: err.message
                });
            }
        })();
    },
    findOne: (req, res, next) => {
        promise.coroutine(function* () {
            try {
                const product = yield Product.findOne(req.params, {});
                res.status(200).json({
                    success: true,
                    data: product
                });
            } catch (err) {
                res.status(500).json({
                    success: false,
                    data: err.message
                });
            }
        })();
    },
    create: (req, res, next) => {
        promise.coroutine(function* () {
            try {
                let product = yield Product.create(req.body, {});
                if (product) {
                    res.status(200).json({
                        success: true,
                        data: product
                    });
                } else {
                    res.status(404).json({
                        success: false,
                        data: {
                            message: "Le produit n'existe pas"
                        }
                    });
                }
            } catch (err) {
                res.status(500).json({
                    success: false,
                    data: err.message
                });
            }
        })();
    },
    update: (req, res, next) => {
        promise.coroutine(function* () {
            try {
                let product = yield Product.findOne({
                    "id": parseInt(req.params.id)
                }, {});
                if (product) {
                    product = yield product.update(JSON.parse(JSON.stringify(req.body)), {
                        patch: true,
                        method: "update",
                        require: true
                    });
                    res.status(200).json({
                        success: true,
                        data: product
                    });
                } else {
                    res.status(404).json({
                        success: false,
                        data: {
                            message: "Le produit n'existe pas"
                        }
                    });
                }
            } catch (err) {
                res.status(500).json({
                    success: false,
                    data: err.message
                });
            }
        })();
    },
    delete: (req, res, next) => {
        promise.coroutine(function* () {
            try {

                let product = yield Product.findOne({
                    "id": parseInt(req.params.id)
                }, {});
                if (product) {
                    product.destroy()
                        .then(function () {
                            res.json({
                                success: true,
                                data: {
                                    message: 'Categorie supprimée avec succès'
                                }
                            });
                        })
                        .catch(function (err) {
                            res.status(500).json({
                                success: false,
                                data: {
                                    message: err.message
                                }
                            });
                        });
                } else {
                    res.status(404).json({
                        success: false,
                        data: {
                            message: "Le produit n'existe pas"
                        }
                    });
                }
            } catch (err) {
                res.status(500).json({
                    success: false,
                    data: {
                        message: err.message
                    }
                });
            }

        })();
    },
};