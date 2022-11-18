module.exports = (sequelize, Sequelize) => {
    const autoroles = sequelize.define("autoroles", {
        guildId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        enabled: {
            type: Sequelize.BOOLEAN,
        },
        roles: {
            type: Sequelize.STRING,
            defaultValue: "",
            get() {
                if(!this.getDataValue('roles')) return []
                return this.getDataValue('roles').split(';')
            },
            set(val)
            {
                this.setDataValue('roles', val.join(';'))
            }
        }
    }, {
        timestamps: false
    })
    return autoroles;
}