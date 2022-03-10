# Introduction to Custom Commands

Custom commands are user-defined, server-specific commands designed to execute specific tasks. Custom commands can be used to provide custom commands to your server's userbase, and add features to devbot to improve your overall experience. They are highly customizable and very powerful.

Currently, custom commands can only be created in JSON.&#x20;

## Introduction to Creating Commands in JSON

A command, at its base, created in JSON, looks like this:

```
{
    "name": "My Command",
    "alias": "cmd",
    "output": {}
}
```

The name of the command is mainly for organization purposes.

The alias is how users will actually run your command, following devbot's prefix in your server.&#x20;

The output defines what your command actually does. It consists of action objects, like below:

```
"type": "message",
"action": {
    "messageType": "send",
    "content": "Hello there"
}
```

The action objects contain an action type, options, and another action that will run based on the configuration.