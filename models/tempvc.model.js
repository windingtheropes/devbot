module.exports = (sequelize, Sequelize) => {
    const tvc = sequelize.define("tempvc", {
        guildId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        channelId: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false
    })
    return tvc;
}