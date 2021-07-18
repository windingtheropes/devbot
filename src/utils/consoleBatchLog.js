module.exports = console
console.batchLog = function(array){
    array.forEach(message => {
      console.log(message)
    })
  } 