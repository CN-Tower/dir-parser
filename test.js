const fn = require('funclib');
const parse = require('./index');

let target = './';
let excludes = [ '.git', 'dir-info.txt', 'package-lock.json' ];

/**
 * Get parsed dir-tree
 * ============================================================
 */
parse(target, {
  excludes: excludes,
  // dirTree: false,    // Default is true, parsed conatins a string of directory structure truee;
  // members: true      // Default is false, If true, parsed will conatins an object of all members's info;
  // files: true,       // Default is false, If true, parsed will conatins an array of all subfiles's info;
}).then(parsed => {
  fn.log(parsed.dirTree, '# parsed.dirTree');
  fn.log(fn.pick(parsed, prop => prop !== 'dirTree'), '# parsed result info');
  // fn.log(parsed.members, '# parsed.members');
  // fn.log(parsed.files, '# parsed.files');
});

/**
 * Get parsed dir-info (members & files)
 * ============================================================
 */
excludes = ['.git', 'node_modules', 'dir-info.txt', 'package-lock.json'];
parsed = parse(target, {
  excludes: excludes,
  dirTree: false,
  files: true,
  members: true
}).then(parsed => {
  fn.log(parsed.members, '# parsed.members');
  fn.log(parsed.files, '# parsed.files');
});

