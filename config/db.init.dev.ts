import db from '../models/index.js';

module.exports = () => {
    db.sequelize.sync().then(() => { // {force:true} wioll clear db every start
        console.log('Database synced.');
    })
}