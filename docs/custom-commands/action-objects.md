# Action Objects
An action object's outcome relies entirely on its assigned type, along with other things. On this page we'll look over the different action types and how to use them.

Types are split into two classes, bridges and methods. Bridges sit in place of actions, and execute separate actions based on a condition or conditions. Methods directly perform tasks.

# Bridges

## multi
The **multi** bridge can be used anywhere where you want to execute more than one action. It accepts an array of action objects, `actions`, and will execute them in order they were added. 

Example:
```
'type': 'multi',
'actions': [
  {
    // more exciting action goes here
  },
  {
    // an even more exciting action goes here
  }
]
```
## equals
The **equals** bridge can be used to check whether or not two [variables](text-escapes.md#variables) are equal. These variables are defined in the conditions array as strings. If the variables are equal, it will execute `action`. Otherwise, it will execute `actionElse`.

Example:
```
'type': 'equals',
'conditions': [
  '{args[0]}',
  'rules'
],
'action': {
  // Show the user the rules
},
'actionElse': {
  // Send a generic message
}

```

## switch
Just like in many programming languages, the **switch** bridge can be used to test against many different conditions. Condition objects are placed in the `cases` array. Condition objects include the `case`[condition], and an `action`, which contains another action object. If the `variable` matches the case, the action will be executed. If none of the conditions are true, it will execute `default`, which contains an action object.

Example:
```
'type': 'switch',
'variable': '{args[0]}',
'cases': [
  {
    case: 'rules',
    action: {
      // Show the user the rules
    }
  },
  {
    case: 'invite',
    action: {
      // Show the user the server invite link
    }
  }
],
'default': {
  // Send a generic message
}
```

# Methods

## message
The **message** method sends or replies to a message. It accepts a message object with a `messageType`, `send` and `reply`, a `channel` [if using send] and `content`. Send will send a message in a `channel`, or by default, in the channel where the command was executed. Reply will reply to the command.

Example 1:
```
'type': 'message',
'message': {
  'messageType': 'send',
  'channel': '1234567890',
  'content': '{user} executed the command with these arguments:\n {args}'
}

```

Example 2:
```
'type': 'message',
'message': {
  'messageType': 'send',
  'content': 'You can download our official client at https://www.example.com.'
}

```

Example 3:
```
'type': 'message',
'message': {
  'messageType': 'reply',
  'content': 'Server Rules: Lorem ipsum dolor sit amet.'
}

```

## directMessage
The **directMessage** method sends a direct message to a user. It accepts a message object, which includes the user `to` dm, if left blank it will send to the user who executed the command. It also accepts the message `content`.

Example:

```
'type': 'directMessage',
'message': {
  'content': 'Thanks for joining {server}, here is some information to get you started!'
}
```