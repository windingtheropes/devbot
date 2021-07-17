![devbot logo](https://user-images.githubusercontent.com/17016045/117669802-4b723d00-b175-11eb-9661-a6eb2f4e6e7d.png)
# devbot 
devbot is a Discord bot with various features. see the update changelog at [CHANGELOG.MD](https://github.com/windingtheropes/devbot/edit/main/CHANGELOG.MD).
# license
this project is licensed under the BSD 3-Clause License. please read the full license in [LICENSE](https://github.com/windingtheropes/devbot/edit/main/LICENSE)
# prerequisites
if you want to host devbot yourself, it's highly recommended that you use a stable release from [RELEASES](https://github.com/windingtheropes/devbot/releases). To host, you need a method of doing so, as well as your own Discord application. Go to https://discord.com/developers/applications to create an application. if you're planning on hosting devbot, you'll need to include a config.json file.
## node js and npm
node.js and npm are required to run devbot. download node.js [here](https://nodejs.org/en/).
after downloading and extracting devbot a release or cloning the source code, navigate to the directory where you extracted/cloned the code and run `npm install`. this will install the required dependencies to run devbot.\
run `node index.js` to start the bot.
## config.json
config.json is located in the src/ folder of devbot.
### format
the config.json file contains sensitive and variable bot information, as such, is ignored in commits and must be added manually by the user. 
### fields
the config.json file contains the following:
token: the bot token, get it from https://discord.com/developers/applications/APP-ID-GOES-HERE/bot > Token > Copy
prefix: the bot prefix, currently a constant value, not server variable (to be changed in the future)

```
{
"token":"BOT-TOKEN-GOES-HERE",
"prefix":"BOT-PREFIX-GOES-HERE",
}
```
# devbot public
devbot is publicly available as a Discord bot. [invite](https://discord.com/api/oauth2/authorize?client_id=732280990323441704&permissions=8&scope=bot) devbot to your discord server today!
Devbot is still in early stages of development. If devbot is unresponsive after the execution of a command, please start an issue and repeat the steps which got you to unresponsiveness so we can work on fixing the issue. view and create [issues](https://github.com/windingtheropes/devbot/issues).

Devbot also doesn't have a stable hosting solution, so there are no guarantees of long term support.
