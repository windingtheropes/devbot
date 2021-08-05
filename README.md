![devbot logo](https://user-images.githubusercontent.com/17016045/117669802-4b723d00-b175-11eb-9661-a6eb2f4e6e7d.png)
# devbot 
devbot is a multipurpose Discord bot with various features. It is written entirely in javascript. see the update changelog at [CHANGELOG.MD](https://github.com/alacriware/devbot/blob/canary/CHANGELOG.md).
# prerequisites
if you want to host devbot yourself, it's highly recommended that you use a stable release from [RELEASES](https://github.com/windingtheropes/devbot/releases). To host, you need a method of doing so, as well as your own Discord application. Go to https://discord.com/developers/applications to create an application. if you're planning on hosting devbot, you'll need to include a config.json file.
## node js and npm
node.js and npm are required to run devbot. download node.js [here](https://nodejs.org/en/).
after downloading and extracting devbot a release or cloning the source code, navigate to the directory where you extracted/cloned the code and run `npm install`. this will install the required dependencies to run devbot.\
run `node index.js` to start the bot.
## config/
the config directory is located at the root of the devbot running directory.\
the config folder contains sensitive and variable information and contents must be added manually by the user who is hosting the bot. 
### config.json
the config.json file contains the following:\
token: the bot token, get it from https://discord.com/developers/applications/APP-ID-GOES-HERE/bot > Token > Copy\
prefix: the default bot prefix.\
operators: users who have access to internal bot commands, like setstatus. Only give this permission to people you trust.\
mongoPath: the path to your mongo database.
```
{
"token":"BOT-TOKEN-GOES-HERE",
"prefix":"BOT-PREFIX-GOES-HERE",
"operators": ["USERIDHERE", "USERIDHERE"],
"mongoPath": "mongodb://path/goes/here"
}
```
### words/
the words/ directory contains banned word lists, words separated by commas.

# devbot public
devbot is publicly available as a Discord bot. [invite](https://discord.com/api/oauth2/authorize?client_id=732280990323441704&permissions=8&scope=bot) devbot to your discord server today!
Devbot is still in early stages of development. Please report bugs and provide feedback on the [issues](https://github.com/windingtheropes/devbot/issues) page.

# framework
to accelerate development of devbot, a framework has been adapted. This framework includes a powerful command handler, and different feature handlers for listeners. The devbot framework will likely be released in the future. 
