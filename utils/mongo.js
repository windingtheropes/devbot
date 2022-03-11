const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()

const mongoPath = process.env.MONGOPATH

module.exports = async () => {
    await mongoose.connect(mongoPath, {  
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return mongoose
}
