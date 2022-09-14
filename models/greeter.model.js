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
        },
        joinRolesEnabled: {
            type: Sequelize.BOOLEAN,
        },
        joinRoles: {
            type: Sequelize.STRING,
            get() {
                return this.getDataValue('joinRoles').split(';')
            },
            set(val)
            {
                this.setDataValue('joinRoles',val.join(';'))
            }
        }
    }, {
        timestamps: false
    })
    return greeter;
}