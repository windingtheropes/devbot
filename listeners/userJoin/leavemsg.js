const {greeter} = require("../../models/index")
module.exports = {
    type: 'leave',
    callback: async (member) => {
        const serverData = await greeter.findOne({ where: { guildId: member.guild.id } })
        if (!serverData.leaveMessageEnabled) return

        const formatted = serverData.leaveMessage.replace(/{user}/g, member.user.username).replace(/{mention}/g, `<@!${member.user.id}>`).replace(/{server}/g, member.guild.name)
        member.guild.channels.cache.get(serverData.channelId).send(formatted)
    }
}