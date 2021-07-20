module.exports = {
    commands: ['ping', 'latency'],
    callback: (message, arguments, text, client) => {
        message.channel.send(`:ping_pong: Pong!\n**Discord API Latency:** ${client.ws.ping}ms`)
    },
}