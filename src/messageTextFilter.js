const fs = require('fs')
var filter
var data = fs.readFileSync('config/textfilter.txt', 'utf8')
filter = data.split(',')
module.exports = (message) => {
    const { content } = message
    filter.forEach(word => {
        if(content.includes(`${word}`))
        {
            message.delete()
        }
    })
}