module.exports = (sequelize, Sequelize) => {
    const OperatorEntry = sequelize.define("operators", {
        userId: {
            type: Sequelize.STRING,
        }
    }, {
        timestamps: false
    })
    return OperatorEntry;
}