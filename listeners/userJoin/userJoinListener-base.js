const { Events } = require("discord.js")
// const {joinapproval} = require("../../models/index")
// const { joinApproval } = require("./joinapprovalListener")

const allListeners = []
module.exports.import = (callback) => {
  allListeners.push(callback)
  console.log("Registered new join/leave listener.")
}

module.exports.listen = (client) => {
  if (allListeners.length == 0) {
    return console.log('No join/leave listeners registered.')
  }
  else {
    console.log('Listening for join/leave.')
  }

  function runJoinListeners(member) {
    allListeners.forEach(option => {
      let {
        callback,
        enabled = true,
        type,
        joinApproval
      } = option

      if(!enabled) return
      // If joinapproval intercepts are on, this should be uncommented
      // if(joinApproval) return

      if (!type) return
      if (type === 'join') {
        callback(member, client)
      }
      else {
        return
      }
    })
  }

  function runLeaveListeners(member) {
    allListeners.forEach(option => {
    let {
      callback,
      enabled = true,
      type
    } = option

    if(!enabled) return

    if (!type) return
    if (type === 'leave') {
      callback(member, client)
    }
    else {
      return
    }
  })
}

  client.on(Events.GuildMemberAdd, (member) => {
      runJoinListeners(member)
    // ||
    // || JOIN APPROVAL INTERCEPT FUNCTIONALITY
    // || JOIN APPROVAL IS A PAUSED, LIKELY CANCELLED FEATURE, BUT THIS IS LEFT HERE JUST IN CASE.
    // ||
    // // If joinapproval is enabled, run it first, then pass in a function that dictates when to treat the user as a member.
    // const serverData = joinapproval.findOne({where:{guildId: member.guild.id}})
    // if(serverData) {
    //   if(serverData.enabled)
    //   {
    //     const joinApprovalListener = allListeners.filter(x => x.joinApproval == true)[0]
    //     if(joinApprovalListener)
    //     {
    //       if(joinApprovalListener.enabled === false) return
    //       // run joinapproval, pass runjoinlisteners
    //       joinApprovalListener.callback(member, client, runJoinListeners)
    //     }
    //   }
    //   else {
    //     // joinapproval is not enabled
    //     runJoinListeners()
    //   }
    // }
    // else {
    //   // joinapproval data not found, so it's not enabled
    //   runJoinListeners()
    // }
    })

    client.on(Events.GuildMemberRemove, (member) => {
      runLeaveListeners(member)
    })
  }
