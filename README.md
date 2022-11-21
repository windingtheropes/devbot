# devbot 
Devbot is a multipurpose Discord bot with various features. It is written entirely in javascript. See the update changelog at [CHANGELOG.md](https://github.com/alacriware/devbot/blob/canary/CHANGELOG.md).

# deploying with nodejs
Devbot can also be deployed on nodejs, by cloning the source code and running index.js with the process manager of your choice. 

Sensitive bot configuration should be stored in a `.env` file in the project root. The file should be formatted as below:
```
HOST=localhost
DB=devbot
DB_USER=dbuser
DB_PASSWORD=dbpass
TOKEN=BOTTOKEN
operators=0,0
clientId=0
```

# devbot public
Devbot is publicly available as a Discord bot. [Invite](https://discord.com/api/oauth2/authorize?client_id=732280990323441704&permissions=8&scope=bot) devbot to your discord server today!
Devbot is still in early stages of development. Please report bugs and provide feedback on the [issues](https://github.com/windingtheropes/devbot/issues) page.
