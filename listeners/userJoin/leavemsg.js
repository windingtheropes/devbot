const welcomeSchema = require('../../schemas/welcomemessage-schema')
const mongo = require('../../utils/mongo')
module.exports = {
    type: 'leave',
    callback: async (member) => {

        await mongo().then(async (mongoose) => {
            try {

                const serverData = await welcomeSchema.findOne({ _id: member.guild.id })
                if (!serverData.leaveMsgEnabled) return

                const parsed = serverData.leaveMsg.replace(/{user}/g, member.user.username).replace(/{mention}/g, `<@!${member.user.id}>`).replace(/{server}/g, member.guild.name)
                member.guild.channels.cache.get(serverData.channelId).send(parsed)

            } finally {
            }
        })

    }
}