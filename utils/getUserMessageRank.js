const getMessageLeaderboard = require('./getMessageLeaderboard')
module.exports = async (userId, guildId) => {
    const leaderboard = getMessageLeaderboard(guildId)
    console.log(leaderboard)
    const userRank  = leaderboard.find(o => o[0] === author.id);
    return userRank
}