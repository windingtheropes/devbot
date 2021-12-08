const allJoinListeners = []
  module.exports = (callback) => {
       allJoinListeners.push(callback)
       console.log("Registered new member join listener.")
  }
  
  module.exports.listen = (client) => {
    client.on('guildMemberAdd', (member) => {
        allJoinListeners.forEach(option => {

          //don't trigger the listener callback from a message that the bot sent
          console.log(client.user)
          console.log(member)

          let {
            callback,
            enabled,
            type = 'join'
          } = option

          // join or leave are the types
          if(!type.toLowerCase === 'leave' || 'join'){ 
            throw new Error(`Invalid type`)
            return
          }
          if (member == client.user) {
            return
          }

          if(type.toLowerCase === 'join' && enabled) 
          {
            callback(member, client)
          }
        })
  
    })
  }

