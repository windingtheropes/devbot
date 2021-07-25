module.exports = async (message, client) => {
    const messages = await message.channel.messages.fetch({ limit: 2 });
    const lastMessage = messages.last();
    const debounce = 1500
    if((message.createdTimestamp - lastMessage.createdTimestamp <= debounce) 
    && 
    lastMessage.content === message.content 
    || 
    (message.createdTimestamp - lastMessage.createdTimestamp <= debounce * .75) ) 
    {
        message.delete()
    }
}