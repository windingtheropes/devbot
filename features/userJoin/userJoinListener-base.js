const allJoinListeners = []
  module.exports = (callback) => {
       allJoinListeners.push(callback)
       console.log("Registered new member join listener.")
  }
  
  module.exports.listen = (client) => {
    client.on('guildMemberAdd', (member) => {
        allJoinListeners.forEach(callback => {

          //don't trigger the listener callback from a message that the bot sent
          console.log(client.user)
          console.log(member)
          if (member == client.user) {
            return
          }

          callback(member, client)
        })
  
    })
  }

