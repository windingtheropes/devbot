module.exports = (str) => {
    str = str.toLowerCase()
    if(str === 'true') { return true }
    else if(str === 'false') { return false }
    else { return null }
}