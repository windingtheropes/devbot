const allListeners = []
  module.exports.import = (callback) => {
       allListeners.push(callback)
       console.log("Registered new voice chat state change listener.")
  }
  
  module.exports.listen = (client) => {
    if(allListeners.length == 0)
    {
      return console.log('No voice channel state change listeners registered.')
    }
    else
    {
      console.log('Listening for voice channel state changes.')
    }
    client.on('voiceStateUpdate', (oldm, newm) => {
        allListeners.forEach(option => {
         
          let { 
            callback,
            enabled = true
          } = option

            if(!enabled) {
                return
            }
            callback(oldm, newm, client)
        
        })
  
    })
  }

