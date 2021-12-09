const filteredWords = ['thisword', 'yes']
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
module.exports = (message) => {
    const { content } = message
    const words = content.split(/[ ]+/)
    filteredWords.forEach(filteredWord => {
        words.forEach(word => {
            word = word.toLowerCase()
            if(word == filteredWord || word.includes(' ' + filteredWord + ' '))
            {
                console.log('exact word found')
                
                return
            }
            if(word.startsWith(filteredWord.charAt(0)) || word.endsWith(filteredWord.charAt(filteredWord.length-1)))
            {
                console.log('starts or ends with the corresponding letter')
                checkSimilarities(word, filteredWord, message)
            }
            if(word.startsWith(filteredWord.charAt(0)) && word.endsWith(filteredWord.charAt(filteredWord.length-1))){
                console.log('starts and ends with the corresponding letter')
                checkSimilarities(word, filteredWord, message)
            }
            if(word.startsWith(filteredWord) || word.endsWith(filteredWord))
            {
                console.log('starts or ends with word')
            }
        })
    })
}

function checkSimilarities(word, filteredWord, message)
{
    if(word.length >= filteredWord.length - 2 && word.length <= filteredWord.length + 2)
                {
                    console.log('word length is within a 2 character range from the original length')
                    if(word.length == filteredWord.length)
                    {
                        console.log("exact same length")
                        areSimilar = areCharsSimilar(filteredWord, word)
                        console.log(areSimilar)
                        if(areSimilar >= 80)
                        {
                            console.log('80% of chars are the same')
                           
                            return
                        }
                    }
                    else
                    {
                        areSimilar = areCharsSimilar(filteredWord, word)
                        console.log(areSimilar)
                        if(areSimilar >= 85)
                        {
                            console.log('80% of chars are the same')
                            
                            return
                        }
                    }
                }
}


function areCharsSimilar(s1, s2) //with same length
{
    if(!s1.length == s2.length)
    {
        return false
    }

    var s1chars = s1.split('')
    var s2chars = s2.split('')

    var charSimilarities = 0

    for(var i=0; i < s1chars.length; i++)
    {
        if(s1chars[i] == s2chars[i])
        {
            charSimilarities++
        }
    }

    
        return (charSimilarities / s1.length)*100
    
}