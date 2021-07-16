module.exports = {
    commands: ['ping', 'latency'],
    callback: (message, arguments, text) => {
        message.channel.send(`:ping_pong: Pong!`).then((m) => {
            m.edit(`:ping_pong: Pong!\n**Latency:** ${m.createdTimestamp - message.createdTimestamp}ms`)
        })
    },
}