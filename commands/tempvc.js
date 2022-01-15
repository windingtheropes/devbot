const tvcschema = require('../schemas/tempvoicechat-schema.js')
const mongo = require('../utils/mongo.js')
module.exports = {
    commands: ['tvc', 'tempvc'],
    description: 'Create a temporary voice chat. As soon as the voice chat is empty, it will be deleted. You can optionally set a user limit before the name.',
    exampleUsage: ['0 temporary'],
    miniDescription: 'Create a temporary voice chat.',
    usage: '[user limit] <channel name>',
    callback: async (message, args, text, client) => {
        // !tempchat <limit> <name>

        var name
        var limit = 0
        console.log(typeof args[0])
        if (parseInt(args[0])) {
            limit = args[0]
            args.shift()
            name = args.join(' ')
        }
        else {
            name = args.join(' ')
        }
        if (limit > 100) {
            return message.channel.send("The limit cannot be greater than 100.")
        }




        //create a channel then log the channel id to the database

        const channel = await message.guild.channels.create(name, {
            type: 'GUILD_VOICE',
            userLimit: limit
        })

        const cid = channel.id
        const gid = message.guild.id

        await mongo().then(async (mongoose) => {
            try {
                await tvcschema.findOneAndUpdate(
                    {
                        _id: gid
                    },
                    {
                        $push: {
                            channels: [cid]
                        }
                    },
                    {
                        upsert: true
                    })
                message.reply({ content: `Created a temporary voice chat ${'`' + channel.name + '`'} ${+ limit > 0 ? `with a limit of ${limit} user${limit > 1 ? 's' : ''}` : ''}.` })
                return

            } finally {
                mongoose.connection.close()
            }
        })

    }










}