const allListeners = []
module.exports.import = (callback) => {
  allListeners.push(callback)
  console.log("Registered new member count listener.")
}

module.exports.listen = (client) => {
  if (allListeners.length == 0) {
    return console.log('No member count listeners registered.')
  }
  else {
    console.log('Listening for member count changes.')
  }
  client.on('guildMemberAdd', (member) => {
    allListeners.forEach(option => {

      let {
        callback,
        enabled,
        type
      } = option

      if (!type) return
      if (type === 'join') {
        callback(member, client)
      }
      else {
        return
      }

    })
    })

    client.on('guildMemberRemove', (member) => {
      allListeners.forEach(option => {

        let {
          callback,
          enabled,
          type
        } = option

        if (!type) return
        if (type === 'leave') {
          callback(member, client)
        }
        else {
          return
        }

      }) })
  }

