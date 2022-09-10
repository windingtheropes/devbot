const config = require("../config/db.config");
const Sequelize = require("sequelize");
const operatorModel = require("../models/operators.model")
const userMessageModel = require("../models/userMessages.model")

const sequelize = new Sequelize(
    config.DB, 
    config.USER, 
    config.PASSWORD, {
        host: config.HOST,
        logging: config.logging,
        dialect: config.dialect,
        operatorsAliases: '1',
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    })

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.operators = operatorModel(sequelize, Sequelize);
db.userMessages = userMessageModel(sequelize, Sequelize);

module.exports = db;