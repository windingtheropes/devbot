const Discord = require('discord.js')
module.exports = calc 
const { prefix } = require('../config.json')
function calc(args, command) {
    try
    {
        switch (args[0].toLowerCase()) {
            case "multiply":
                args.splice(0,1)
                if (args.length < 2) 
                {
                    command.channel.send("You need at least 2 values to multiply.")
                    return
                }
                    let product = 1 
                    args.forEach((value) => {
                    product = product * parseFloat(value)
                    })
                command.channel.send("The product of " + args + " is " + "`" + product.toString() + "`")
                break;
             case "divide":
                args.splice(0,1)
                if (args.length < 2) {
                    command.channel.send("You need at least 2 values to divide.")
                    return
                }
                let quotient = 0 
                args.forEach((value) => {
                    if(quotient==0)
                    {
                    quotient = value;
                    }
                    else
                    {
                        quotient = quotient / parseFloat(value)
                    }
                
                })
                    command.channel.send("The quotient of " + args + " is " + "`" + quotient.toString() + "`")
                break;
            case "add":
                
                args.splice(0,1)
                if (args.length < 2) {
                    command.channel.send("You need at least 2 values to add.")
                    return
                }
                let sum = 0
                args.forEach((value) => {
                sum = sum + parseFloat(value)
                })
                command.channel.send("The sum of " + args + " is " + "`" + sum.toString() + "`")
                break;
            case "subtract":
                args.splice(0,1)
                if (args.length < 2) {
                    command.channel.send("You need at least 2 values to subtract.")
                    return
                }
                let res = 0
                let running = false
                args.forEach((value) => {
                    if(!running)
                    {
                        running = true
                        res = parseFloat(value)
                    }
                    else
                    {
                        res = res - parseFloat(value)
                    }
                    
                })
                command.channel.send("The result of " + args + " is " + "`" + res.toString() + "`")
                break;
            default:
                command.channel.send("You must provide a valid operation. Type `" + prefix + "help calc` for more help with this command.");
                break;
        }
    }
    catch
    {
        command.channel.send("You must provide an operation. Type `" + prefix + "help calc` for more help with this command.");
    }
    
   
}