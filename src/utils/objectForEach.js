module.exports = Object
Object.forEach = function(obj, callback) {
    Object.keys(obj).forEach(key => {
        let field = obj[key]
        callback(field)
    });
}