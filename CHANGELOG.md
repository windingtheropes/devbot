# devbot 3.0.0
Devbot 3.0.0 is the first iteration of the major version 3. On the technical end, it's been completely rewritten from the ground up, using the latest Discord APIs and Discord.JS v14.

## bot changes
- /slowmode command
- automatic roles on join (configured with /autoroles)
- operator only setstatus command
- welcome messages (configured with /welcome)
- revamped and optimized existing commands such as tvc, channelinfo, serverinfo, whois and poll
- all command permissions are now configurable directly in server settings, under Integrations -> Devbot
- /say command
- disabled /support command

## technical changes
- migrated to Discord.JS v14
- completely rewritten, modular listener system for client events
- now fully supporting slash commands.
- moved to mariadb for data storage
- paused official contanerization efforts
- started the transition to option-based slash commands
- moved to integrated slash command permissions

If you have any issues or feature requests for Devbot, please submit an [issue](https://github.com/windingtheropes/devbot/issues).