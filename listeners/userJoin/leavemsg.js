const {greeter} = require("../../models/index")
const {formatUserGuildString} = require("../../utils/devbot")
module.exports = {
    type: 'leave',
    callback: async (member) => {
        const serverData = await greeter.findOne({ where: { guildId: member.guild.id } })
        if(!serverData) return
        if (!serverData.leaveMessageEnabled) return

        member.guild.channels.cache.get(serverData.channelId).send(formatUserGuildString(serverData.leaveMessage, member))
    }
}