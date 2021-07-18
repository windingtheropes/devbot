module.exports = function(value, array){
    array.forEach(item => {
        if(value === item){
            return true;
        }
    })
}