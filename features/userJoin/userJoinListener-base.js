const allListeners = []
  module.exports = (callback) => {
       allListeners.push(callback)
       console.log("Registered new member join listener.")
  }
  
  module.exports.listen = (client) => {
    if(allListeners.length == 0)
    {
      return console.log('No join listeners registered.')
    }
    else
    {
      console.log('Listening for new members.')
    }
    client.on('guildMemberAdd', (member) => {
        allListeners.forEach(option => {

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

