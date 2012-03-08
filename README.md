# COFFEETUTS [![endorse](http://api.coderwall.com/floriankrueger/endorsecount.png)](http://coderwall.com/floriankrueger) #

This is an attempt to rewrite the code examples of Pedro Teixeira's [Node Tuts](http://nodetuts.com "Node Tuts - Node.js Free Screencasts Tutorials") episodes in CoffeeScript. I am new to [node.js](http://nodejs.org/ "node.js") and [CoffeeScript](http://jashkenas.github.com/coffee-script/ "CoffeeScript") but this way I am trying to learn the syntax of CoffeeScript while learning node.js. 

For folder and filenames I am trying to stick as close as possible to the names used by Pedro Teixeira, although sometimes this is not possible or not up-to-date anymore (e.g. the `nodemon-ignore` files which are now called `.nodemonignore`).

Also I am using version `1.0.27` of npm and version `0.4.7` of node.js amongst others and several APIs have changed since the original Node Tuts recording. So there might be a few differences in the code. In case I remember those differences, I will put them in the according `README.md` of the episode.

As I said, I am new to both of the technologies so please be nice and do not kill me for mistakes or differences ;)

Check out [Node Tuts](http://nodetuts.com "Node Tuts - Node.js Free Screencasts Tutorials") it's great!

## Development Environment ##

Just a few words on the tools that I use. 

- Editing: [Sublime Text 2](http://www.sublimetext.com/ "Sublime Text: The text editor you'll fall in love with")
- Syntax Highlighting for CoffeeScript: [jashkenas's CoffeeScript TextMate bundle](https://github.com/jashkenas/coffee-script-tmbundle "A TextMate Bundle for the CoffeeScript programming language.")
- **UNNECESSARY** CoffeeScript compiling & node.js refreshing: An attempt introduced by Pedro Teixeira is the following command: `(coffee --compile --watch .&); nodemon app.js`
- **NEW** Since [nodemon](https://github.com/remy/nodemon "Monitor for any changes in your node.js application and automatically restart the server - perfect for development") does support CoffeeScript monitoring, all you need to do is `nodemon app.coffee`. It is only importand to have a `.nodemonignore` file in all of your node.js application folders, otherwise nodemon is only looking for `*.js` files (see [nodemon issue #32](https://github.com/remy/nodemon/issues/32 "Monitoring coffee-script file doesn't restart server"))