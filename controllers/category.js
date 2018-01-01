/*jslint node: true */
'use strict';

const promise = require('bluebird');
const Category = require('../models/category');

module.exports = {

    findAll: (req, res, next) => {
        promise.coroutine(function* () {
            try {
                const categories = yield Category.findAll(req.query, {});
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
                const category = yield Category.findOne(req.params, {});
                res.status(200).json({
                    success: true,
                    data: category
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
                let category = yield Category.create(req.body, {});
                if (category) {
                    res.status(200).json({
                        success: true,
                        data: category
                    });
                } else {
                    res.status(404).json({
                        success: false,
                        data: {
                            message: "La catégorie n'existe pas"
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
                let category = yield Category.findOne({
                    "id": parseInt(req.params.id)
                }, {});
                if (category) {
                    category = yield category.update(JSON.parse(JSON.stringify(req.body)), {
                        patch: true,
                        method: "update",
                        require: true
                    });
                    res.status(200).json({
                        success: true,
                        data: category
                    });
                } else {
                    res.status(404).json({
                        success: false,
                        data: {
                            message: "La catégorie n'existe pas"
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

                let category = yield Category.findOne({
                    "id": parseInt(req.params.id)
                }, {});
                if (category) {
                    category.destroy()
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
                            message: "La catégorie n'existe pas"
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