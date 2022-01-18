# devbot changelog
## 2.1.4.3
disable feedback command

## 2.1.4.2
prefix database hotfix

## 2.1.4.1
feedback command hotfix

## 2.1.4
### added listdisabledcommands and cleardisabledcommands
-listdisabledcommands and clear disabledcommands: an easy way to tell what commands are disabled, and an easy way to re-enable them all at once. listdisabledcommands is available to anyone.
-added feedback command, added feedbackChannel option in config.json and FEEDBACKCHANNEL environment variable, a channel, that the bot can access, where you want feedback to be sent to 

## 2.1.3
### added rng command, added disablecommand, messagecount
-added the rng command, enter two numbers and get a random result between them
-added disablecommand for operators, it can be used to temporarily disable bot commands if an unexpected issue arises
-added messagecount feature and rank command. the rank command is currently disabled, but messages will actively be counted from this patch forward.
-added command IDs
-added version file and version command
-updated github.com/alacriware/devbot to github.com/windingtheropes/devbot everywhere

## 2.1.2
### bugfixes and qol changes, added messagecounter
-fixed the help command so commands without properties won't break the help command anymore
-disabled the ban and kick commands
-updated the temporary voicechat command to optionally take a limit, otherwise just accepting the name of the channel

## 2.1.1.5
-remove permission requirement from prefix set
-fix prefix set so it doesn't throw a topology closed error when trying to set

## 2.1.1.4 - prefix command patch
### fixed the prefix command to work with discord.js v13
-fixed prefix set to use permissions.has instead of hasPermission

## 2.1.1.3 - kick and ban hotfix followup
### fixed the kick and ban commands, as well as the client, to work with discord.js v13
-added the GUILD_BANS intent
-changed hasPermission to permissions.has
### other bugfixes
-check if the target user exists before proceeding
-wrap the final kick/ban function in a try statement and if it fails return a generic error
### notes
since this command was created earlier in the development of devbot 2.0, it will probably have to be rewritten at some point due to messy code and inefficiencies, if not removed alltogether.

