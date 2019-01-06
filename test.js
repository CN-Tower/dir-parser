const fn = require('funclib');
const parse = require('./index');

const target = './';
const excludes = ['.git'];

const parsed = parse(target, {
  excludes: excludes,
  // dirTree: false,
  // files: true,
  // members: true
});

const BaseInfo = fn.pick(parsed, prop => !['members', 'files', 'dirTree'].includes(prop));

fn.log(BaseInfo, '# Parsed Info');
fn.log(parsed.dirTree, '# Parsed Dir Tree');
// fn.log(parsed.files, '# Parsed Dir Files');
// fn.log(parsed.members, '# Parsed Dir Members');

