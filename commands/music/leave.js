module.exports ={
    commands: 'leave',
    listed: false,
    enabled: false,
    callback: async (message, args, text, client) => {
        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel) {
            return message.reply("You need to be in a voice channel to run this command.")
        }

        await voiceChannel.leave()
        message.react('👋')
    }
}