# Nodetuts Episode 12 w/ multipart.js#

## File uploads using node.js and express ##

This is the original version of Pedro Teixeira's Nodetuts Episode 12 using [multipart.js](https://github.com/isaacs/multipart-js "A JavaScript library for parsing and writing multipart messages."). The module is no longer available in the [npm](http://npmjs.org/ "npm - Node Package Manager") registry but as a standalone module. This is how I installed it into my `node_modules` folder.

1. Go to `your_node_project_folder/node_modules` (create it if not existent)
2. Clone the git repo into a folder called `multipart` with the following command:  
    `git clone http://github.com/isaacs/multipart-js.git multipart`
3. Use the module like you would use any other [npm](http://npmjs.org/ "npm - Node Package Manager") installed module  
    `var multipart = require('multipart');` for JavaScript  
    `multipart = require 'multipart'` for CoffeeScript