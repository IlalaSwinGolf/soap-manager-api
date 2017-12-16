/*jslint node: true */
'use strict';

exports.up = function (knex, Promise) {
    return createUserTable()
        .then(createProductCategoryTable)
        .then(createProductTable)
        .then(createStockMovementTable)
        .then(createRecipeTable)
        .then(createCompositionTable)
        .then(createLinksTable);


    function createUserTable() {
        return knex.schema.createTableIfNotExists('users', function (table) {
            table.increments('id').unsigned().primary();
            table.string('username').unique().notNullable();
            table.string('email').unique().notNullable();
            table.string('password').notNullable();
            table.boolean('disabled').defaultTo(true);
            table.timestamps();
        });
    }

    function createProductCategoryTable() {
        return knex.schema.createTableIfNotExists('product_categories', function (table) {
            table.increments('id').unsigned().primary();
            table.string('name').unique().notNullable();
            table.timestamps();
        });
    }

    function createProductTable() {
        return knex.schema.createTableIfNotExists('products', function (table) {
            table.increments('id').unsigned().primary();
            table.integer('category_id').references('id').inTable('product_categories').onDelete("CASCADE");
            table.string('name').unique().notNullable();
            table.string('text');
            table.timestamps();
        });
    }

    function createStockMovementTable() {
        return knex.schema.createTableIfNotExists('stock_movements', function (table) {
            table.increments('id').unsigned().primary();
            table.integer('product_id').references('id').inTable('products').onDelete("CASCADE");
            table.float('quantity_before').notNullable().defaultTo(0.0);
            table.float('quantity').notNullable().defaultTo(0.0);
            table.timestamps();
        });
    }

    function createRecipeTable() {
        return knex.schema.createTableIfNotExists('recipes', function (table) {
            table.increments('id').unsigned().primary();
            table.string('name').unique().notNullable();
            table.float('weight').notNullable();
            table.timestamps();
        });
    }

    function createCompositionTable() {
        return knex.schema.createTableIfNotExists('compositions', function (table) {
            table.integer('recipe_id').references('id').inTable('recipes').onDelete("CASCADE");
            table.integer('product_id').references('id').inTable('products').onDelete("CASCADE");
            table.primary(['recipe_id', 'product_id']);
            table.float('percentage').notNullable();
            table.timestamps();
        });
    }

    function createLinksTable() {
        return knex.schema.createTableIfNotExists('links', function (table) {
            table.increments('id').unsigned().primary();
            table.string('name').unique().notNullable();
            table.string('url').notNullable();
            table.timestamps();
        });
    }
};

exports.down = function (knex, Promise) {
    return dropLinkTable()
        .then(dropCompositionTable)
        .then(dropRecipeTable)
        .then(dropStockMovementTable)
        .then(dropProductTable)
        .then(dropProductCategoryTable)
        .then(dropUserTable);


    function dropLinkTable() {
        return knex.schema.dropTableIfExists('links');
    }

    function dropCompositionTable() {
        return knex.schema.dropTableIfExists('compositions');
    }

    function dropRecipeTable() {
        return knex.schema.dropTableIfExists('recipes');
    }

    function dropStockMovementTable() {
        return knex.schema.dropTableIfExists('stock_movements');
    }

    function dropProductTable() {
        return knex.schema.dropTableIfExists('products');
    }

    function dropProductCategoryTable() {
        return knex.schema.dropTableIfExists('product_categories');
    }

    function dropUserTable() {
        return knex.schema.dropTableIfExists('users');
    }

};