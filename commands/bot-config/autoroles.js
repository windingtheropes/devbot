const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require('discord.js')
const { greeter } = require('../../models')
module.exports = {
    enabled: false,
    permissions: Permissions.FLAGS.MANAGE_GUILD,
    data: new SlashCommandBuilder()
        .setName('autoroles')
        .setDescription('Configure autoroles in your server.')

        .addSubcommand(subcommand =>
            subcommand.setName('enabled')
                .setDescription('Enable autoroles.')
                .addBooleanOption(option =>
                    option.setName('enable')
                        .setDescription('Whether or not this feature is enabled.')
                        .setRequired(true)

                ))
        .addSubcommand(subcommand =>
            subcommand.setName('add')
                .setDescription('Add roles to be automatically given.')
                .addRoleOption(option =>
                    option.setName('role')
                        .setDescription('The role to give.')
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
            subcommand.setName('remove')
                .setDescription('Remove an autorole.')
    )
    ,
    async execute(interaction) {    
        const serverData = await (async () => {
            const sd = await greeter.findOne({where:{guildId: interaction.guild.id}})
            if(!sd) {
                return await greeter.create({guildId: interaction.guild.id})
            }
            return sd
        })()
        if (interaction.options.getSubcommand() == "enable")
        {
            const enable = interaction.options.getBoolean("enable")
            if(!enable) return
            serverData.joinRolesEnabled = enable;
            serverData.save();
        }
        else if (interaction.options.getSubcommand() == "remove")
        {
            const role = interaction.options.getRole("role")
            const prevRoles = serverData.joinRoles
            var newRoles = []

            for(const role of prevRoles)
            {
                if(role === role.id) continue
                newRoles.push(role)
            }

            serverData.joinRoles = newRoles
            serverData.save()

            return interaction.reply({content: `Removed ${role.name} from the list of autoroles.`, ephemeral: true})
        }
        else if (interaction.options.getSubcommand() == "add")
        {
            const role = interaction.options.getRole("role")
            serverData.joinRoles = serverData.joinRoles.push(role.id)
            serverData.save()

            return interaction.reply({content: `Added ${role.name} to the list of autoroles.`, ephemeral: true})
        }
        else if (interaction.options.getSubcommand() == "clear")
        {
            serverData.joinRoles = []
            serverData.save()

            return interaction.reply({content: "Cleared server autoroles.", ephemeral: true})
        }
    }
}
 