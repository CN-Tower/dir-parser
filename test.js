const fn = require('funclib');
const parse = require('./index');

const target = './';
const excludes = ['.git'];

const parsed = parse(target, { 'excludes': excludes });

fn.log(fn.pick(parsed, ['dirName', 'dirNum', 'fileNum']), '# Parsed Info');
fn.log(parsed.dirTree, '# Parsed Dir Tree');