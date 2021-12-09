const allListeners = []
  module.exports = (callback) => {
       allListeners.push(callback)
       console.log("Registered new voice chat state change listener.")
  }
  
  module.exports.listen = (client) => {
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

