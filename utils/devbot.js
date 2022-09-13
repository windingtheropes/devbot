module.exports.formatUserGuildString = (s, member) => {
    return s.replace(/{user}/g, member.user.username).replace(/{mention}/g, `<@!${member.user.id}>`).replace(/{server}/g, member.guild.name))
}