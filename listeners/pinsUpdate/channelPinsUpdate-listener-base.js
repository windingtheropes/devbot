const allListeners = []
  module.exports.import = (callback) => {
       allListeners.push(callback)
       console.log("Registered new pin update listener.")
  }
  
  module.exports.listen = (client) => {
    if(allListeners.length == 0)
    {
      return console.log('No pin update listeners registered.')
    }
    else
    {
      console.log('Listening for pin updates.')
    }
    client.on('channelPinsUpdate', (channel, time) => {
        allListeners.forEach(option => {
            let {
                callback,
                enabled
              } = option
              callback(channel, time, client)
        })
      
    })
  }

