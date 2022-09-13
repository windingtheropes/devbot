const {greeter} = require("../../models/index")
const {formatUserGuildString} = require("../../utils/devbot")
module.exports = {
    type: 'join',
    callback: async (member) => {
        const serverData = await greeter.findOne({ where: { guildId: member.guild.id } })
        if (!serverData.joinMessageEnabled) return

        member.guild.channels.cache.get(serverData.channelId).send(formatUserGuildString(serverData.joinMessage, member))
    }
}