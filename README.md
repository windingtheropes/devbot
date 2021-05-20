![devbot logo](https://user-images.githubusercontent.com/17016045/117669802-4b723d00-b175-11eb-9661-a6eb2f4e6e7d.png)
# devbot
devbot is a Discord bot with various features.
# license
this project is licensed under the BSD 3-Clause License. please read the full license in [LICENSE](https://github.com/windingtheropes/devbot/edit/main/LICENSE)
# prerequisites
if you want to host devbot yourself, you need a method of doing so, as well as your own Discord application. Go to https://discord.com/developers/applications to create an application. if you're planning on hosting devbot, you'll need to include a config.json file.
## config.json
config.json is located in the src/ folder
### format for config.json file
the config.json file contains sensitive and variable bot information, as such, is ignored in commits and must be added manually by the user. 
#### fields
the config.json file contains the following:
token: the bot token, get it from https://discord.com/developers/applications/APP-ID-GOES-HERE/bot > Token > Copy

```
{
"token":"BOT-TOKEN-GOES-HERE",
"prefix":"BOT-PREFIX-GOES-HERE",
"operators": ["OPERATOR-USER-ID-GOES-HERE","OPERATOR-USER-ID-GOES-HERE"]
}
```
