const allJoinListeners = []
  module.exports = (callback) => {
       allJoinListeners.push(callback)
       console.log("Registered new pin update listener.")
  }
  
  module.exports.listen = (client) => {
    client.on('channelPinsUpdate', (channel, time) => {
        allJoinListeners.forEach(option => {
            let {
                callback,
                enabled
              } = option
              callback(channel, time, client)
        })
      
    })
  }

