# devbot changelog
## 2.1.1.3 - kick and ban hotfix followup
### fixed the kick and ban commands, as well as the client, to work with discord.js v13
-added the GUILD_BANS intent
-changed hasPermission to permissions.has
### other bugfixes
-check if the target user exists before proceeding
-wrap the final kick/ban function in a try statement and if it fails return a generic error
### notes
since this command was created earlier in the development of devbot 2.0, it will probably have to be rewritten at some point due to messy code and inefficiencies, if not removed alltogether.
## 2.1.1.4 - prefix command patch
### fixed the prefix command to work with discord.js v13
-fixed prefix set to use permissions.has instead of hasPermission
