![devbot logo](https://user-images.githubusercontent.com/17016045/117669802-4b723d00-b175-11eb-9661-a6eb2f4e6e7d.png)
# devbot 
devbot is a Discord bot with various features. see the update changelog at [CHANGELOG.MD](https://github.com/windingtheropes/devbot/edit/main/CHANGELOG.MD).
# license
this project is licensed under the BSD 3-Clause License. please read the full license in [LICENSE](https://github.com/windingtheropes/devbot/edit/main/LICENSE)
# prerequisites
if you want to host devbot yourself, it's highly recommended that you use a stable release from [RELEASES](https://github.com/windingtheropes/devbot/releases). To host, you need a method of doing so, as well as your own Discord application. Go to https://discord.com/developers/applications to create an application. if you're planning on hosting devbot, you'll need to include a config.json file.
## node js and npm
required
## config.json
config.json is located in the src/ folder of devbot.
### format
the config.json file contains sensitive and variable bot information, as such, is ignored in commits and must be added manually by the user. 
### fields
the config.json file contains the following:
token: the bot token, get it from https://discord.com/developers/applications/APP-ID-GOES-HERE/bot > Token > Copy
prefix: the bot prefix, currently a constant value, not server variable (to be changed in the future)
operators: an array of User ID strings that are bot operators. These users gain special access to special bot commands, such as the downtime command. Only give this access to people you trust.

```
{
"token":"BOT-TOKEN-GOES-HERE",
"prefix":"BOT-PREFIX-GOES-HERE",
"operators": ["OPERATOR-USER-ID-GOES-HERE","OPERATOR-USER-ID-GOES-HERE"]
}
```
