const fn = require('funclib');
const parse = require('./index');

const target = './';
let excludes = [ '.git', 'dir-info.txt', 'package-lock.json' ];

let parsed = parse(target, {
  excludes: excludes,
  // dirTree: false,    // Default is true, returns will conatins a string of directory structure truee;
  // files: true,       // Default is false, If true, parsed will conatins an array of all subfiles's info;
  // members: true      // Default is false, If true, parsed will conatins an object of all members's info;
});

const BaseInfo = fn.pick(parsed, prop => prop !== 'dirTree');

fn.log(BaseInfo, '# Parsed Basic Info');
fn.log(parsed.dirTree, '# Parsed Dir Tree');
// fn.log(parsed.files, '# Parsed Dir Files');
// fn.log(parsed.members, '# Parsed Dir Members');

excludes = ['.git', 'node_modules', 'dir-info.txt', 'package-lock.json'];
parsed = parse(target, {
  excludes: excludes,
  dirTree: false,
  files: true,
  members: true
});

fn.log(parsed, '# Parsed Info');
