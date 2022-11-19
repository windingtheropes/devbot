const { tempvc } = require("../../models/index")
module.exports = {
    enabled: true,
    callback: async (oldm, newm, client) => {
        if (!oldm || !oldm.channel) return // only want leave events
        const guildId = oldm.guild.id
        const channelId = oldm.channel.id
        const serverData = await tempvc.findOne({ where: { guildId, channelId } })

        if (!serverData) return

        const guild = client.guilds.cache.get(guildId)
        const channel = guild.channels.cache.get(oldm.channel.id)

        if (channel.members.size < 1) {
            channel.delete()
            tempvc.destroy({where:{guildId, channelId}})
        }
    }
}