function stripBOM(content) {
  // Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
  // because the buffer-to-string conversion in `fs.readFileSync()`
  // translates it to FEFF, the UTF-16 BOM.
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

if (require.extensions['.xjs']) return
require.extensions['.xjs'] = function(module, filename) {
  var content = require('fs').readFileSync(filename, 'utf8');
  content = stripBOM(content)
  
  var lines = content.split('\n')
  for (var i=0; i<lines.length; i++) {
    var line = lines[i].split(':').map(function(line) { return line.trim() })
    if (line[1] !== 'X-FEATURE' || line.length !== 3) break
    line = line[2]
    try {
      var transformation = module.parent.require('feature-'+line).transformCodeString
    } catch (err) {
      err.message = 'could not require feature-'+line+', maybe you have to npm install it?\n' + err.message
      throw err
    }
    content = transformation(content)
  }
  
  module._compile(content, filename);
}
