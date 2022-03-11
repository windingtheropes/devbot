# Variables
There are a set amount of runtime variables in the devbot custom command handler. Every variable can be accessed by wrapping its identifier in {curly braces}.

**List of runtime variables:**

`{args}`: returns all of the arguments passed alongside the command. 
      Eg. `?command yes 1 -> yes 1`
`{args[i]}`: returns a specified argument from the arguments array. 
      Eg. `{args[0]}` `?command no 2 -> no`
      !!! note
      
      Keep in mind that index is 0, meaning the first argument is 0, not 1. Also remember that an argument could return undefined if the user did not fill it.
