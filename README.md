# devbot
devbot is a Discord bot with various features.
# license
this project is licensed under the BSD 3-Clause License. please read the full license in [LICENSE](https://github.com/windingtheropes/devbot/edit/main/LICENSE)
## config.json
### format for config.json file
the config.json file contains variable and sensitive bot information that can't be published to the git repo. When hosting you must create this file with the proper information based on the bot token. Note: prefix in the config file is a temporary fix, to be removed in a future version.
```
{
"token":"BOT-TOKEN-GOES-HERE",
"prefix":"BOT-PREFIX-GOES-HERE"
}
```
