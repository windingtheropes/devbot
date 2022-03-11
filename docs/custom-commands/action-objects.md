# Action Objects
An action object's outcome relies entirely on its assigned type, along with other things. On this page we'll look over the different action types and how to use them.

Types are split into two classes, bridges and methods. Bridges, sit in place of actions, and execute separate actions based on a condition or conditions. Methods directly perform tasks.

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
The **equals** bridge can be used to check whether or not two [variables](custom-commands/variables.md) are equal. If the variables are equal, it will execute `action`. Otherwise, it will execute `actionElse`.
