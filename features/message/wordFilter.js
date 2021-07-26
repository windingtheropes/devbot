const fs = require('fs')
const path = require('path')
const bannedWords = []

loadWords()
function loadWords() {
    const wordsPath = path.join(__dirname, '../../config/words')
    try
    {

        fs.readdir(wordsPath, (err, files) => {
        if (err)
          console.log(err);
        else {
          files.forEach(file => {
            const data = fs.readFileSync(path.join(wordsPath, file), 'utf8')
            const words = data.split(',')
            words.forEach(word => {
                bannedWords.push(word)
            })

          })
        }
    })
}
catch
{
    //no word lists/another error
}
}

module.exports = (message) => {
    const { content } = message
    bannedWords.forEach(word => {
        if(content.includes(` ${word} `) || content.startsWith(` ${word}`) || content.endsWith(`${word} `) || content === word)
        {
            message.delete()
        }
    })
}


