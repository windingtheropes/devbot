const allMessageListeners = []
  
  module.exports = (callback) => {
       allMessageListeners.push(callback)
  }
  
  module.exports.listen = (client) => {
    client.on('message', (message) => {
        
        allMessageListeners.forEach(callback => {

          //don't trigger the listener callback from a message that the bot sent
          if (message.author == client.user) {
            return
          }

          callback(message, client)
        })
  
    })
  }