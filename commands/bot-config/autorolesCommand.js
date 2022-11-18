const { PermissionFlagsBits, SlashCommandBuilder } = require('discord.js')
const { autoroles } = require('../../models')
const {canManageRole} = require("../../utils/devbot")

module.exports = {
    permissions: PermissionFlagsBits.ManageGuild,
    // permissions: Permissions.FLAGS.MANAGE_GUILD,
    data: new SlashCommandBuilder()
        .setName('autoroles')
        .setDescription('Configure automatically giving roles to members upon joining the server.')
        .addSubcommand(subcommand =>
            subcommand.setName('add')
                .setDescription('Add an autorole.')
                .addRoleOption(option =>
                    option.setName('role')
                        .setDescription('The role to add.')
                        .setRequired(true)

                ))
        .addSubcommand(subcommand =>
            subcommand.setName('remove')
                .setDescription('Remove an autorole.')
                .addRoleOption(option =>
                    option.setName('role')
                        .setDescription('The role to remove.')
                        .setRequired(true)

                ))
        .addSubcommand(subcommand =>
            subcommand.setName('clear')
                .setDescription('Clear all autoroles.')
        )
        .addSubcommand(subcommand => 
            subcommand.setName("enabled")
                .setDescription("Whether or not to enable autoroles.")
                .addBooleanOption(opt => 
                    opt.setName("enable")
                        .setDescription("Enable or disable autoroles.")))
    ,
    async execute(interaction) {
        const me = await interaction.guild.members.me
        if(!me.permissions.has(PermissionFlagsBits.ManageRoles))
        {
            return interaction.reply({content: "The bot does not have permission to manage roles.", ephemeral: true})
        }

        const serverData = await (async () => {
            const sd = await autoroles.findOne({ where: { guildId: interaction.guild.id } })
            if (!sd) {
                return await autoroles.create({ guildId: interaction.guild.id })
            }
            return sd
        })()
        if (interaction.options.getSubcommand() == "enabled") {
            const enable = interaction.options.getBoolean("enable") || false
            serverData.enabled = enable;
            serverData.save();
            return interaction.reply({ content: `${enable ? "Enabled" : "Disabled"} autoroles.`, ephemeral: true })
        }
        else if (interaction.options.getSubcommand() == "remove") {
            const role = interaction.options.getRole("role")
            const roles = serverData.roles

            // Filter the roles array
            const newRoles = (() => {
                let a = []
                for (const r of roles) {
                    if (r === role.id) continue
                    a.push(r)
                }
                return a
            })()

            serverData.roles = newRoles
            serverData.save()

            return interaction.reply({ content: `Removed ${'`'}${role.name}${'`'} from the list of autoroles.`, ephemeral: true })
        }
        else if (interaction.options.getSubcommand() == "add") {
            const role = interaction.options.getRole("role")

            if(!canManageRole(role, me)) return interaction.reply({ content: `The bot does not have permission to manage the role ${'`'}${role.name}${'`'}. Any role you wish for it to manage must be below its highest role.`, ephemeral: true })

            const roles = serverData.roles

            // Make sure not to add duplicates
            for (const r of roles) {
                if (r === role.id) return interaction.reply({ content: `${'`'}${role.name}${'`'} is already on the list of autoroles.`, ephemeral: true })
            }

            const newRoles = roles;
            newRoles.push(role.id)

            serverData.roles = newRoles
            serverData.save()

            return interaction.reply({ content: `Added ${'`'}${role.name}${'`'} to the list of autoroles.`, ephemeral: true })
        }
        else if (interaction.options.getSubcommand() == "clear") {
            serverData.roles = []
            serverData.save()

            return interaction.reply({ content: "Cleared server autoroles.", ephemeral: true })
        }
    }
}
