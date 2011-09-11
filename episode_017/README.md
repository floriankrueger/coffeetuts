# Nodetuts Episode 18 #

## Building node.js modules ##

You can use the `random_string` module like in the following example:

    $ node
    > RSG = require('./random_string');
    { create: [Function] }
    > rsg1 = RSG.create(15);
    { string_length: 15 }
    > rsg1.generate();
    'lqmignisyutecxa'

Same for the `random_string_singleton` module

    $ node
    > rs = require('./random_string_singleton');
    { generate: [Function] }
    > rs.generate(10);
    'jbunvsszai'