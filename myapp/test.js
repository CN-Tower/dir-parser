const fn = require('funclib');
const parser = require('dir-parser');

parser('./', {
  excludes: ['.git', 'node_modules', 'public'],
  getFiles: true,
  getChildren: true,
  dirTree: false
}).then(parsed => {
  // fn.log(parsed.children, '# parsed.children');
  console.log(fn.pretty(parsed.files));
});