const allMessageListeners = []
  module.exports = (options) => {
       allMessageListeners.push(options)
       console.log("Registered new message listener.")
  }
  
  module.exports.listen = (client) => {
    client.on('message', (message) => {
        allMessageListeners.forEach(option => {

          //don't trigger the listener callback from a message that the bot sent
          if (message.author == client.user) {
            return
          }
          
          let {
            callback,
            enabled = true
          } = option

          if(enabled === false) {
            return
          }
          
          callback(message, client)
        })
  
    })
  }

