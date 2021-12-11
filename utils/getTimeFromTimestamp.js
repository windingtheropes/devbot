
 var timestamp = Date.now() - Date.parse('08/02/2020 12:33:07')
var minutes = 0 
var hours = 0
var days = 0
var months = 0
var years = 0
var secondsSinceEpoch = timestamp / 1000


while (true) {
   
    

    if (secondsSinceEpoch >= 60) {
        secondsSinceEpoch -= 60
        minutes += 1
    } 

     else if (minutes >= 60) {
        minutes -= 60
        hours += 1
    } 

     else if (hours >= 24) {
        hours -= 24
        days += 1
    } 

    else if (days >= 30) {
        days -= 30
        months += 1
    }

     else if (months >= 12) {
        months -= 12
        years += 1
        }  
    else
    {
        break
    }

}

console.log(`inputted date was ${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes, ${secondsSinceEpoch} seconds ago`)

