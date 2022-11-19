const {joinapproval} = require("../../models/index")
const {MessageEmbed} = require('discord.js')

module.exports = {
    type: 'join',
    joinApproval: true,
    enabled: false,
    callback: async (member, client, next) => {
        const guild = member.guild;

        const serverData = await joinapproval.findOne({where:{guildId: guild.id}})
        if(!serverData) return

        if(serverData.channelId)
        {

        }
        else if(serverData.directMessages) 
        {
            const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${guild.name} join approval`)
            .setDescription(`Approve ${member.name} as a member?`)
            guild.members.cache.fetch(guild.ownerId).send("hi")
        }
        else {
            return 
        }
    }
}