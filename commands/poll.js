const { SlashCommandBuilder, PermissionFlagsBits, MessageEmbed } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Start a poll.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addSubcommand(subcommand => 
            subcommand
            .setName('yesno')
            .setDescription('A simple poll with only the answers yes and no.')
            .addStringOption(option => 
                option.setName('question')
                    .setDescription('The poll question.')
                    .setRequired(true)
            )
        )
        .addSubcommand(subcommand => 
            subcommand.setName('long')
            .setDescription('A more advanced poll with more options.')

            .addStringOption(option => 
                option.setName('question')
                    .setDescription('The poll question.')
                    .setRequired(true)
            )
            .addStringOption(option => 
                option.setName('option_1')
                    .setDescription('A poll opton. Add an :emoji: to the front for a custom reaction. Ex: :emoji: option')
                    .setRequired(true)
            )
            .addStringOption(option => 
                option.setName('option_2')
                    .setDescription('A poll opton. Add an :emoji: to the front for a custom reaction. Ex: :emoji: option')
                    .setRequired(true)
            )
            .addStringOption(option => 
                option.setName('option_3')
                    .setDescription('A poll opton. Add an :emoji: to the front for a custom reaction. Ex: :emoji: option')
                    .setRequired(false)
            )
            .addStringOption(option => 
                option.setName('option_4')
                    .setDescription('A poll opton. Add an :emoji: to the front for a custom reaction. Ex: :emoji: option')
                    .setRequired(false)
            )
            .addStringOption(option => 
                option.setName('option_5')
                    .setDescription('A poll opton. Add an :emoji: to the front for a custom reaction. Ex: :emoji: option')
                    .setRequired(false)
            )
            .addStringOption(option => 
                option.setName('option_6')
                    .setDescription('A poll opton. Add an :emoji: to the front for a custom reaction. Ex: :emoji: option')
                    .setRequired(false)
            )
            .addStringOption(option => 
                option.setName('option_7')
                    .setDescription('A poll opton. Add an :emoji: to the front for a custom reaction. Ex: :emoji: option')
                    .setRequired(false)
            )
            .addStringOption(option => 
                option.setName('option_8')
                    .setDescription('A poll opton. Add an :emoji: to the front for a custom reaction. Ex: :emoji: option')
                    .setRequired(false)
            )
            .addStringOption(option => 
                option.setName('option_9')
                    .setDescription('A poll opton. Add an :emoji: to the front for a custom reaction. Ex: :emoji: option')
                    .setRequired(false)
            )
            .addStringOption(option => 
                option.setName('option_10')
                    .setDescription('A poll opton. Add an :emoji: to the front for a custom reaction. Ex: :emoji: option')
                    .setRequired(false)
            )
            .addStringOption(option => 
                option.setName('option_11')
                    .setDescription('A poll opton. Add an :emoji: to the front for a custom reaction. Ex: :emoji: option')
                    .setRequired(false)
            )
            .addStringOption(option => 
                option.setName('option_12')
                    .setDescription('A poll opton. Add an :emoji: to the front for a custom reaction. Ex: :emoji: option')
                    .setRequired(false)
            )
            .addStringOption(option => 
                option.setName('option_13')
                    .setDescription('A poll opton. Add an :emoji: to the front for a custom reaction. Ex: :emoji: option')
                    .setRequired(false)
            )
            .addStringOption(option => 
                option.setName('option_14')
                    .setDescription('A poll opton. Add an :emoji: to the front for a custom reaction. Ex: :emoji: option')
                    .setRequired(false)
            )
            .addStringOption(option => 
                option.setName('option_15')
                    .setDescription('A poll opton. Add an :emoji: to the front for a custom reaction. Ex: :emoji: option')
                    .setRequired(false)
            )
            .addStringOption(option => 
                option.setName('option_16')
                    .setDescription('A poll opton. Add an :emoji: to the front for a custom reaction. Ex: :emoji: option')
                    .setRequired(false)
            )
            .addStringOption(option => 
                option.setName('option_17')
                    .setDescription('A poll opton. Add an :emoji: to the front for a custom reaction. Ex: :emoji: option')
                    .setRequired(false)
            )
            .addStringOption(option => 
                option.setName('option_18')
                    .setDescription('A poll opton. Add an :emoji: to the front for a custom reaction. Ex: :emoji: option')
                    .setRequired(false)
            )
            .addStringOption(option => 
                option.setName('option_19')
                    .setDescription('A poll opton. Add an :emoji: to the front for a custom reaction. Ex: :emoji: option')
                    .setRequired(false)
            )
        ),
    async execute(interaction) {
        const alpha = [
            '🇦',
            '🇧',
            '🇨',
            '🇩',
            '🇪',
            '🇫',
            '🇬',
            '🇭',
            '🇮',
            '🇯',
            '🇰',
            '🇱',
            '🇲',
            '🇳',
            '🇴',
            '🇵',
            '🇶',
            '🇷',
            '🇸',
            '🇹',
        ]
        const question = await interaction.options.getString('question')
        const pollEmbed = new MessageEmbed()
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()})
        if(await interaction.options.getSubcommand() === 'yesno')
        {
            const message = await interaction.reply({  content: `📊 **${question}**`, embeds: [pollEmbed], fetchReply: true });
            message.react('👍');
            message.react('👎');
        }
        if(await interaction.options.getSubcommand() === 'long')
        {   
            var pollString
            const pollData = []
            for(var i = 1; i <= 20; i++)
            {
                const option = interaction.options.getString(`option_${i}`)
                if(!option) break
                const words = option.split(' ')
                if(words[0].startsWith(':') && words[0].endsWith(':') || words[0].startsWith('<:') && words[0].endsWith('>'))
                {   
                    const emoji = words[0]
                    const newOption = option.replace(`${emoji} `, '')
                    pollData.push([emoji, newOption])
                }
                else
                {
                    pollData.push([alpha[i-1], option])
                }
                pollString = `${!pollString ? `${pollData[i-1][0]} ${pollData[i-1][1]}` : `${pollString}\n${pollData[i-1][0]} ${pollData[i-1][1]}`}`
            }
            pollEmbed.addField('Options', pollString)
            const message = await interaction.reply({ content: `📊 **${question}**`, embeds: [pollEmbed], fetchReply: true });
            pollData.forEach(opt => {
                message.react(opt[0]).catch(err => {
                    return interaction.followUp({ content: 'There was an erorr.', ephemeral: true})
                })
            })
        }

        
    }
}
