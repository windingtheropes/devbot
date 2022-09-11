const db = require('../models/index.js');

module.exports = () => {
    db.sequelize.sync().then(() => {
        console.log('Database synced.');
    })
}