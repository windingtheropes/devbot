module.exports = (sequelize, Sequelize) => {
    const OperatorEntry = sequelize.define("operators", {
        userId: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false
    })
    return OperatorEntry;
}