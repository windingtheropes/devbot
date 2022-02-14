const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require('discord.js')
const welcomeSchema = require('../../schemas/welcomemessage-schema')
const mongo = require('../../utils/mongo')
module.exports = {
    permissions: Permissions.FLAGS.MANAGE_GUILD,
    data: new SlashCommandBuilder()
        .setName('welcome')
        .setDescription('Configure welcome messages in your server.')
        .addSubcommand(subcommand => 
            subcommand.setName('join')
                .setDescription('Configure join messages.')
                .addBooleanOption(option => 
                    option.setName('enabled')
                        .setDescription('Whether or not this feature is enabled.')
                        .setRequired(true)

                        )
                .addStringOption(option => 
                    option.setName('message')
                        .setDescription('The message to send when a user joins.')
                        )
                .addChannelOption(option => 
                    option.setName('channel')
                        .setDescription('The channel to send messages in.')
                        )  
            )
        .addSubcommand(subcommand => 
            subcommand.setName('leave')
                .setDescription('Configure leave messages.')
                .addBooleanOption(option => 
                    option.setName('enabled')
                        .setDescription('Whether or not this feature is enabled.')
                        .setRequired(true)
                )
                .addStringOption(option => 
                    option.setName('message')
                        .setDescription('The message to send when a user leaves.')
                        )
                .addChannelOption(option => 
                    option.setName('channel')
                        .setDescription('The channel to send messages in.')
                        )       
            )
        ,
    async execute(interaction) {
        if(interaction.options.getSubcommand() === 'join')
        {
            const channel = interaction.options.getChannel('channel')
            const joinEnabled = interaction.options.getBoolean('enabled')
            const message = interaction.options.getString('message')

            await mongo().then(async (mongoose) => {
                try {
                    if(joinEnabled && message && channel)
                    {
                        await welcomeSchema.findOneAndUpdate({_id: interaction.guild.id}, {
                            joinMsgEnabled: joinEnabled,
                            joinMsg: message,
                            channelId: channel.id
                        }, 
                        {
                            upsert: true
                        }
                        )
                    }
                    else
                    {
                        await welcomeSchema.findOneAndUpdate({_id: interaction.guild.id}, {
                            joinMsgEnabled: false,
                        }, 
                        {
                            upsert: true
                        }
                        )
                    }
                    
                } finally {
                    return interaction.reply({content: `${joinEnabled ? 'Enabled' : 'Disabled'} join messages${message ? ` and set the message to '${message}'` : '.'}`, ephemeral: true})
                }
            })
        }
        else if(interaction.options.getSubcommand() === 'leave')
        {
            const channel = interaction.options.getChannel('channel')
            const leaveEnabled = interaction.options.getBoolean('enabled')
            const message = interaction.options.getString('message')

            await mongo().then(async (mongoose) => {
                try {
                    if(leaveEnabled && message && channel)
                    {
                        await welcomeSchema.findOneAndUpdate({_id: interaction.guild.id}, {
                            leaveMsgEnabled: leaveEnabled,
                            leaveMsg: message,
                            channelId: channel.id
                        }, 
                        {
                            upsert: true
                        }
                        )
                    }
                    else
                    {
                        await welcomeSchema.findOneAndUpdate({_id: interaction.guild.id}, {
                            leaveMsgEnabled: leaveEnabled,
                        }, 
                        {
                            upsert: false
                        }
                        )
                    }
                    
                } finally {
                    return interaction.reply({content: `${leaveEnabled ? 'Enabled' : 'Disabled'} leave messages${message ? ` and set the message to '${message}'` : '.'}`, ephemeral: true})
                }
            })
        }

    }
}