const allListeners = []
  module.exports.import = (options) => {
       allListeners.push(options)
       console.log("Registered new message listener.")
  }
  
  module.exports.listen = (client) => {
    if(allListeners.length == 0)
    {
      return console.log('No message listeners registered.')
    }
    else
    {
      console.log('Listening for messages.')
    }
    client.on('messageCreate', (message) => {
        allListeners.forEach(option => {

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

