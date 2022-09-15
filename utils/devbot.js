module.exports.formatUserGuildString = (s, member) => {
    return s.replace(/{user}/g, member.user.username).replace(/{mention}/g, `<@!${member.user.id}>`).replace(/{server}/g, member.guild.name)
}

module.exports.getHighestRole = (me) => {
    const rawPositions = me.roles.cache.map(role => role.rawPosition)
    
    var highest = 0;
    for (const pos of rawPositions) 
    {
        if(pos > highest) highest = pos
    }
    return highest
}

module.exports.canManageRole = (role, me) => {
    const rolePos = role.rawPosition;
    const mePos = this.getHighestRole(me);

    if(rolePos > mePos) return false
    return true
}
