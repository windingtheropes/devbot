const welcomeSchema = require('../../schemas/welcomemessage-schema')
const mongo = require('../../utils/mongo')
module.exports = {
    type: 'join',
    callback: async (member) => {

        await mongo().then(async (mongoose) => {
            try {

                const serverData = await welcomeSchema.findOne({ _id: member.guild.id })
                if (!serverData.joinMsgEnabled) return

                const parsed = serverData.joinMsg.replace(/{user}/g, member.user.username).replace(/{mention}/g, `<@!${member.user.id}>`).replace(/{server}/g, member.guild.name)
                member.guild.channels.cache.get(serverData.channelId).send(parsed)

            } finally {
            }
        })

    }
}