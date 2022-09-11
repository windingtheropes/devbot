const db = require('../models/index.js');

module.exports = () => {
    db.sequelize.sync({force:true}).then(() => { // {force:true} wioll clear db every start
        console.log('Database cleared and synced.');
    })
}