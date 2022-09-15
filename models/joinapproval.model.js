module.exports = (sequelize, Sequelize) => {
    const joinapproval = sequelize.define("joinapproval", {
        guildId: {
            type: Sequelize.STRING,
        },
        enabled: {
            type: Sequelize.BOOLEAN,
        },
        timeout: {
            type: Sequelize.INTEGER, // Timeout in seconds before kick
            defaultValue: 300
        },
        channelId: {
            type: Sequelize.STRING,
        },
        directMessages: {
            type: Sequelize.BOOLEAN,
        }
    }, {
        timestamps: false
    })
    return joinapproval;
}
