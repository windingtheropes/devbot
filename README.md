[![mkdocs](https://github.com/windingtheropes/devbot/actions/workflows/main.yml/badge.svg)](https://github.com/windingtheropes/devbot/actions/workflows/main.yml)

# devbot 
Devbot is a multipurpose Discord bot with various features. It is written entirely in javascript. See the update changelog at [CHANGELOG.md](https://github.com/alacriware/devbot/blob/canary/CHANGELOG.md).

# discord

https://discord.gg/VHdTt3KUZQ

# deploying with docker
Devbot can most easily be deployed using Docker, on most platform architectures.

The easiest way to deploy devbot is to use docker-compose, use the following as reference.
```
version: "3"
services:
  devbot:
    image: windingtherope/devbot:latest
    environment: 
      - TOKEN=TOKENGOESHERE
      - MONGOPATH=URLGOESHERE
      - PREFIX=DEFAULTPREFIX
      - OPERATORS=OPERATOR1,OPERATOR2
      - FEEDBACKCHANNEL=CHANNELID
```

Change out the example text for their respective values then run `docker-compose up -r` or `docker compose up -r` and give it a few seconds to start up.

# deploying with nodejs
Devbot can also be deployed on nodejs, by cloning the source code and running index.js with the process manager of your choice. 

In this case, the configuration is stored in /config/config.json and should be formatted as follows.
```
{
    "token": "",
    "mongoPath": "",
    "prefix": "",
    "operators": [""],
    "feedbackChannel": ""
}
```

# devbot public
Devbot is publicly available as a Discord bot. [Invite](https://discord.com/api/oauth2/authorize?client_id=732280990323441704&permissions=8&scope=bot) devbot to your discord server today!
Devbot is still in early stages of development. Please report bugs and provide feedback on the [issues](https://github.com/windingtheropes/devbot/issues) page.

