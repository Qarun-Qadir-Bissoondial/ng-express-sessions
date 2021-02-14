/**
 * Responsible for initializing Sequelize and bootstrapping models and relationships together.
 * The exported will make Sequelize and its instance available throughout the application 
 * to be used where necessary
 */

const bcrypt = require('bcrypt');
const Sequelize  = require('sequelize');
const sequelize = new Sequelize.Sequelize( // TODO: Move options to a config file
    'ngExpressSessions',
    'postgres',
    'password',
    {
        host: "localhost",
        port: 5432,
        dialect: "postgres",
        freezeTableName: true,
    }
);

const Users = require('./User')(sequelize, Sequelize, bcrypt)
const Sessions = require('./Session')(sequelize, Sequelize);

sequelize.sync();

const db = {
    Sequelize,
    connection: sequelize,
    models: {
        Users,
        Sessions
    }
}

module.exports = db;
