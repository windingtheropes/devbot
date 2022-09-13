const config = require("../config/db.config");
const Sequelize = require("sequelize");
const operatorModel = require("../models/operators.model")
const userMessageModel = require("./usermessages.model")
const tempvcModel = require("../models/tempvc.model")
const greeterModel = require("../models/greeter.model")
const joinapprovalModel = require("../models/joinapproval.model")

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
db.tempvc = tempvcModel(sequelize, Sequelize);
db.greeter = greeterModel(sequelize, Sequelize);
db.joinapproval = joinapprovalModel(sequelize, Sequelize);

module.exports = db;