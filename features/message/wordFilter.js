const fs = require('fs')
const path = require('path')
const bannedWords = []

loadWords()
function loadWords() {
    try
    {
        const wordsPath = path.join(__dirname, '../../config/words')
        fs.readdir(wordsPath, (err, files) => {
          files.forEach(file => {
            const data = fs.readFileSync(path.join(wordsPath, file), 'utf8')
            const words = data.split(',')
            words.forEach(word => {
                bannedWords.push(word)
            })

          })
    })
}
catch
{
    //no word lists/another error
}
}

module.exports = {
    callback: (message) => {
        const { content } = message
    bannedWords.forEach(word => {
        if(content.includes(` ${word} `) || content.startsWith(` ${word}`) || content.endsWith(`${word} `) || content === word)
        {
            message.delete()
        }
    })
    }
}


