const { SlashCommandBuilder } = require('@discordjs/builders')
const { version, prerelease } = require('../../versioninfo.json')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('locale')
        .setDescription('Locale options for your server.')
        .addSubcommand(subcommand => 
            subcommand.setName('timezone')
                .setDescription('Configure the timezone')
                .addStringOption(option => 
                    option.setName('zone')
                        .setDescription('The timezone to set.')
                        )
            )
        ,
    async execute(interaction) {
    }
}