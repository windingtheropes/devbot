module.exports = (guild, user, sendMessage, options) =>
{
    if(options.reason && sendMessage)
    {
        user.send(`You have been banned from **${guild.name}** for ${options.reason}.`)
        return user.ban(options)
    }
    if(sendMessage)
    {
        user.send(`You have been banned from **${guild.name}**.`)
        return user.ban(options)
    }
    user.ban(options)
}