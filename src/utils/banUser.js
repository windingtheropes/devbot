module.exports = (message, userIdToBan) =>
{
    if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) {
        return message.channel.send("I do not have permission to ban members.")
    }
    if (!message.member.hasPermission('BAN_MEMBERS')) {
        return message.reply("You do not have permission to ban members.")
    }
    let userToBan
    userToBan = message.guild.member(userIdToBan)

    if (userToBan.hasPermission('BAN_MEMBERS')) {
        return message.reply("You can't ban another member with ban permissions.")
    };

    message.guild.members.ban(userToBan)



}