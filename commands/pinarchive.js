module.exports = {
    commands: ['arp'],
    miniDescription: 'Configure archiving pins.',
    description: "Allows you to setup devbot to automatically archive pins, and organize them into a channel of your choice.",
    callback: (message, arguments, text, client) => {
        message.channel.messages.fetchPinned()
        .then(messages => {
            messages.each(
            msg => {
                
            })
            }
            )
        .catch(console.error);
        
    }
}