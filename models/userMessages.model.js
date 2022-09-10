module.exports = (sequelize, Sequelize) => {
    const Ume = sequelize.define("userMessages", {
        guildId: {
            type: Sequelize.STRING,
        },
        userId: {
            type: Sequelize.STRING,
        },
        messages: {
            type: Sequelize.INTEGER,
        }
    }, {
        timestamps: false
    })
    return Ume;
}