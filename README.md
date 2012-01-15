Switchable, modular, stackable features for your code. Turn on any transformations you'd like to use.

Usage example:

    [jann@Jann-PC tmp]$ cat test.xjs
    // :X-FEATURE: destructure
    
    var a, b, c;
    var val = [{x: 5, y: 6}, 7];
    [{x: a, y: b}, c] = val;
    console.log('how it should be: a=5='+a+', b=6='+b+', c=7='+c);
    [jann@Jann-PC tmp]$ node
    > require('features')
    {}
    > require('./test')
    how it should be: a=5=5, b=6=6, c=7=7
    {}

So, basically, for people who want to use such features:

 - install `feature-<name>` modules for the features you want
 - use `.xjs` as file extension
 - in your main script, do this on top: `require('features')`
 - in your scripts, put lines like this one **ON TOP** (no lines, even no empty ones, may be on top of them): `// :X-FEATURE: destructure`

Note that your main script can't use such features - you might want to use a shim script.

Also note that although this module should just work, the `destructure` feature doesn't do some important things as of 15.01.2012
(most importantly, caching results).

For people who want to make features:

 - make a new npm package named `feature-<name>`
 - in its main file, add a function `transformCodeString(code)` to the exports

See https://github.com/thejh/node-feature-destructure/ for an example.
