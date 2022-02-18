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
            )
            .addSubcommand(subcommand => 
                subcommand.setName('channel')
                    .setDescription('Set the channel to send messages in.')
                    .addChannelOption(option => 
                        option.setName('channel')
                            .setDescription('The channel to send messages in.')
                            .setRequired(true)
            
            ))
        ,
    async execute(interaction) {
        if(interaction.options.getSubcommand() === 'join')
        {           

            const channel = await interaction.options.getChannel('channel')
            const joinEnabled = await interaction.options.getBoolean('enabled')
            const message = await interaction.options.getString('message')

            
                    const serverData = await welcomeSchema.findOne({_id: interaction.guild.id})
                    if(!serverData || !serverData.channelId)
                    {
                        return interaction.reply({content: 'You must specify a channel to send messages in using /welcome channel.', ephemeral: true})
                    }

                    if(joinEnabled && message)
                    {
                        await welcomeSchema.findOneAndUpdate({_id: interaction.guild.id}, {
                            joinMsgEnabled: joinEnabled,
                            joinMsg: message,
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
                    
               
                    return interaction.reply({content: `${joinEnabled ? 'Enabled' : 'Disabled'} join messages${message ? ` and set the message to '${message}'` : '.'}`, ephemeral: true})
               
           
        }
        else if(interaction.options.getSubcommand() === 'leave')
        {

            const channel = await interaction.options.getChannel('channel')
            const leaveEnabled = await interaction.options.getBoolean('enabled')
            const message = await interaction.options.getString('message')

           
                    const serverData = await welcomeSchema.findOne({_id: interaction.guild.id})
                    if(!serverData || !serverData.channelId)
                    {
                        return interaction.reply({content: 'You must specify a channel to send messages in using /welcome channel.', ephemeral: true})
                    }

                    if(leaveEnabled && message)
                    {
                        await welcomeSchema.findOneAndUpdate({_id: interaction.guild.id}, {
                            leaveMsgEnabled: leaveEnabled,
                            leaveMsg: message,
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
                            upsert: true
                        }
                        )
                    }
                    
               
                    return interaction.reply({content: `${leaveEnabled ? 'Enabled' : 'Disabled'} leave messages${message ? ` and set the message to '${message}'` : '.'}`, ephemeral: true})
             
        }
        else if(interaction.options.getSubcommand() === 'channel')
        {
            const channel = await interaction.options.getChannel('channel')

           
                
                    if(channel && channel.type === 'GUILD_TEXT')
                    {
                        await welcomeSchema.findOneAndUpdate({_id: interaction.guild.id}, {
                            channelId: channel.id
                        }, 
                        {
                            upsert: true
                        }
                        )
                    }
                    else
                    {
                        return interaction.reply({content: 'You must specify a valid text channel.'})
                    }
                    
               
                    return interaction.reply({content: `Set the welcome message channel to <#${channel.id}>.`, ephemeral: true})
            
        }

    }
}
