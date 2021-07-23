const mongoose = require("mongoose");

var mongoPath

try {
    mongoPath = require('../config/config.json').mongoPath
}
catch
{
    mongoPath = process.env.DEVBOT_CANARY_MONGOPATH
}

module.exports = async() => {
    await mongoose.connect(mongoPath, {  
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return mongoose
}
