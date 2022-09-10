const userMessages = require("../../models/index").userMessages
module.exports = {
    enabled: true,
    callback: async (message) => {
        const user = await userMessages.findOne({where: {guildId: message.guild.id, userId: message.author.id}})
        if(user) 
        {
            await userMessages.update({messages: user.messages + 1}, {where: {guildId: message.guild.id, userId: message.author.id}})
        }
        else {
            await userMessages.create({
                guildId: message.guild.id, 
                userId: message.author.id,
                messages: 1
            });
        }
    }
}