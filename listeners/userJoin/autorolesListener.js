const {canManageRole} = require("../../utils/devbot")
const {autoroles} = require("../../models/index")
const {PermissionFlagsBits} = require("discord.js")
module.exports = {
    type: 'join',
    callback: async (member, client) => {
        const guild = member.guild
        const me = guild.members.me
        const serverData = await autoroles.findOne({ where: { guildId: member.guild.id } })
        if(!serverData) return
        if (!serverData.enabled) return

        const roles = serverData.roles;
        if(roles === []) return

        if(!me.permissions.has(PermissionFlagsBits.ManageRoles))
        {   
            return console.log("Insufficient permissions to continue.")
        }
        
        for (let id of roles)
        {   
            const role = member.guild.roles.cache.find(x => x.id === id)
            if(!canManageRole(role, me)){ return console.log("Insufficient permissions to continue.") }
            if(!role) continue
            
            try {
                member.roles.add(role)
            } catch {
                console.log("Error adding role to member")
            }  
        }

    }
}