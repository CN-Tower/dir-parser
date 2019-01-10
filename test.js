const fn = require('funclib');
const parse = require('./index');

/**
 * Get parsed dir-tree
 * ============================================================
 */
 let excludes = ['.git', 'dir-info.txt', 'package-lock.json'];
 parse('./', { excludes: excludes }).then(parsed => {
   fn.log(parsed.dirTree, '# parsed.dirTree');
   fn.log(fn.pick(parsed, prop => prop !== 'dirTree'), '# parsed result info');
   // fn.log(parsed.children, '# parsed.children');
   // fn.log(parsed.files, '# parsed.files');
 });
 
 /**
  * Get parsed dir-info (children & files)
  * ============================================================
  */
 excludes = ['.git', 'node_modules', 'dir-info.txt', 'package-lock.json'];
 parse('./', {
   excludes: excludes,
   files: true,       // Default is false, If true, returns will conatins an array of all subfiles's info;
   children: true,    // Default is false, If true, returns will conatins an object of all children's info;
   dirTree: false     // Default is true, returns will conatins a tree of the directory;
 }).then(parsed => {
   fn.log(parsed.children, '# parsed.children');
   fn.log(parsed.files, '# parsed.files');
 });
