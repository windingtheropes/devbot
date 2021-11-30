const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
 
module.exports = {
    commands: 'play',
    listed: false,
    enabled: false,
    callback: async (message, args, text, client) => {
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) {
            return message.reply('You need to be in a voice channel to play music.')
        }
        const userPermissions = voiceChannel.permissionsFor(message.client.user)
        if(!userPermissions.has('CONNECT')) {
            return message.reply("You don't have the correct permissions to run this command.")
        }
        if(!userPermissions.has('SPEAK')) {
            return message.reply("You don't have the correct permissions to run this command.")
        }

        const botPermissions = voiceChannel.permissionsFor(client.user)
        if(!botPermissions.has('CONNECT')) {
            return message.reply("I cannot connect to channels.")
        }
        if(!botPermissions.has('SPEAK')) {
            return message.reply("I cannot speak in channels.")
        }

        if(!args.length)
        {
            return message.reply("You must provide a link or a song name to play.")
        }


        const validURL = (str) =>{
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if(!regex.test(str)){
                return false;
            } else {
                return true;
            }
        }
 
        if(validURL(args[0])){
 
            const  connection = await voiceChannel.join();
            const stream  = ytdl(args[0], {filter: 'audioonly'});
 
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                voiceChannel.leave();
                message.channel.send('leaving channel');
            });
 
            await message.reply(`Now Playing **${args[0]}**`)
 
            return
        }
        else
        {
        const connection = await voiceChannel.join()

        const videoFinder = async(query) => {
            const videoResult = await ytSearch(query)
            return (videoResult.videos.length > 1) ? videoResult.videos[0]: null
        }

        const video = await videoFinder(args.join(' '))

        if(video)
        {
            const stream = ytdl(video.url, {filter: 'audioonly'})
            connection.play(stream, {seek: 0, volume:1}).on('finish', () => {
                voiceChannel.leave()
            })
            await message.reply(`Now playing **${video.title}** from ${video.url}`)
        }
        else {
            message.reply("No video results found.")
        }

    }



    }
}
 