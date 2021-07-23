module.exports = {
    commands: ['ping', 'latency'],
    description: "Get the bot's latency to the Discord API.",
    callback: (message, arguments, text, client) => {
        message.channel.send(`:ping_pong: Pong!\n**Discord API Latency:** ${client.ws.ping}ms`)
    },
}