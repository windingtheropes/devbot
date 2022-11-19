module.exports = (sequelize, Sequelize) => {
    const Ume = sequelize.define("userMessages", {
        guildId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        userId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        messages: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: false
    })
    return Ume;
}