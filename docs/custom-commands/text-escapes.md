# Text Escapes
Text escapes can be inserted into any string, wrapped in {curly braces}. The two main uses of text escapes are methods and variables.

# Variables
There are a set amount of runtime variables in the devbot custom command handler.

**List of runtime variables:**

`{args}`: returns all of the arguments passed alongside the command.  
Eg. `?command yes 1 -> yes 1`

`{args[i]}`: returns a specified argument from the arguments array.  
Eg. `{args[0]}` `?command no 2 -> no`

!!! note
      
      Keep in mind that index is 0, meaning the first argument is 0, not 1. Also remember that an argument could return undefined if the user did not fill it.

`{user}`: returns the username of the message author.  
Eg. `windingtheropes`

`{mention}`: returns a mention of the message author.  
Eg. `@windingtheropes`

`{server}`: returns the name of the server where the command was executed.  
Eg. `dev chat`

# Methods
Methods [or functions] accept a variable and return an output.

**List of methods:**

`{calc()}`: returns the answer to a mathmatical expression, or `MATH ERROR` if the expression is invalid.  
Eg. `{calc(1+1)} -> 2`

