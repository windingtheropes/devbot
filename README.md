![devbot logo](https://user-images.githubusercontent.com/17016045/117669802-4b723d00-b175-11eb-9661-a6eb2f4e6e7d.png)
# devbot 
Devbot is a multipurpose Discord bot with various features. It is written entirely in javascript. See the update changelog at [CHANGELOG.md](https://github.com/alacriware/devbot/blob/canary/CHANGELOG.md).

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
```

Change out the example text for their respective values then run `docker-compose up -r` or `docker compose up -r` and give it a few seconds to start up.


# devbot public
Devbot is publicly available as a Discord bot. [Invite](https://discord.com/api/oauth2/authorize?client_id=732280990323441704&permissions=8&scope=bot) devbot to your discord server today!
Devbot is still in early stages of development. Please report bugs and provide feedback on the [issues](https://github.com/windingtheropes/devbot/issues) page.

