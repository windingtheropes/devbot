const { add } = require("mathjs");

module.exports = (sequelize, Sequelize) => {
    const greeter = sequelize.define("greeter", {
        guildId: {
            type: Sequelize.STRING,
        },
        channelId: {
            type: Sequelize.STRING,
        },
        joinMessageEnabled: {
            type: Sequelize.BOOLEAN,
        },
        leaveMessageEnabled: {
            type: Sequelize.BOOLEAN,
        },
        joinMessage: {
            type: Sequelize.STRING,
        },
        leaveMessage: {
            type: Sequelize.STRING,
        }
    }, {
        timestamps: false
    })
    return greeter;
}