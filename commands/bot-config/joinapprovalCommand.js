const { PermissionFlagsBits, SlashCommandBuilder } = require('discord.js')
const { joinapproval } = require('../../models')
module.exports = {
    enabled: false,
    permissions: PermissionFlagsBits.ManageGuild,
    data: new SlashCommandBuilder()
        .setName('joinapproval')
        .setDescription('Configure join approval in your server.')

        .addSubcommand(subcommand =>
            subcommand.setName('enabled')
                .setDescription('Configure join messages.')
                .addBooleanOption(option =>
                    option.setName('enable')
                        .setDescription('Whether or not this feature is enabled.')
                        .setRequired(true)

                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName('timeout')
                .setDescription("Configure the amount of time before kicking a member that wasn't approved to join.")
                .addNumberOption(option =>
                    option.setName('seconds')
                        .setDescription('Timeout in seconds.')
                        .setRequired(true)

                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName('setchannel')
                .setDescription('Set the channel where join requests will be sent.')
                .addChannelOption(option =>
                    option.setName('channel')
                        .setDescription('The channel to send requests to.')
                        .setRequired(false))
                .addBooleanOption(option =>
                    option.setName('dm')
                        .setDescription('Send join requests to your dms.')
                        .setRequired(false))

        )
    ,
    async execute(interaction) {
        const serverData = await (async () => {
            const sd = await joinapproval.findOne({where:{guildId: interaction.guild.id}})
            if(!sd) {
                return await joinapproval.create({guildId: interaction.guild.id, timeout: 300})
            }
            return sd
        })()
        
        if (interaction.options.getSubcommand() === 'enabled') {
            // Manage Enabling and disabling join approval
            const enable = interaction.options.getBoolean("enable")

            serverData.enabled = (enable ? true : false);
            await serverData.save();
            

            return interaction.reply({content: `${enable ? "Enabled" : "Disabled"} join approval in this server`, ephemeral: true})
        }
        else if (interaction.options.getSubcommand() === 'timeout') {
            const seconds = interaction.options.getNumber("seconds")

            if(!seconds)
            {
                return interaction.reply({content: `No timeout provided, staying at ${serverData.timeout} seconds.`, ephemeral: true})
            }

            serverData.enabled = (enable ? true : false);
            await serverData.save();
            
            return interaction.reply({content: `Set the kick timeout to ${seconds}.`, ephemeral: true})
        }
        else if (interaction.options.getSubcommand() === 'channel') {
            const channel = interaction.options.getChannel("channel")
            const dms = interaction.options.getBoolean("dm")

            if(channel) 
            {
                if(!channel.type === "GUILD_TEXT")
                {
                    return interaction.reply({content: `Must be a text channel.`, ephemeral: true})
                }
                serverData.directMessages = false;
                serverData.channelId = channel.id;
                serverData.save()
                return interaction.reply({content: `Sending join requests to <#${channel.id}>`, ephemeral: true})
            }
            if(dms == true)
            {
                serverData.directMessages = true;
                serverData.channelId = null;
                serverData.save()
                return interaction.reply({content: `Enabled direct messages for join approval.`, ephemeral: true})
            }
        }

    }
}
