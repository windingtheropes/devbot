const {greeter} = require("../../models/index")
module.exports = {
    type: 'join',
    callback: async (member) => {
        const serverData = await greeter.findOne({ where: { guildId: member.guild.id } })
        if (!serverData.joinMessageEnabled) return

        const formatted = serverData.joinMessage.replace(/{user}/g, member.user.username).replace(/{mention}/g, `<@!${member.user.id}>`).replace(/{server}/g, member.guild.name)
        member.guild.channels.cache.get(serverData.channelId).send(formatted)
    }
}