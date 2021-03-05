const fs = require('fs');
const path = require('path');
const fn = require('funclib');
const { DirInfo, FileInfo, calcSizekb } = require('./base');

/**
 * Order of common symbols.
 */
const symbolsOrder = ['_', '-', '(', ')', '@', '&', '#', '^', '+', '~', '$'];

/**
 * Export a dir-parser promise
 * @param target  string
 * @param options object
 */
module.exports = (target, options) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(dirParser(target, options));
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Format excludes or includes
 * @param {*} exs 
 */
function fmtMatchs(exs) {
  return fn.drop(exs.map(ex => fn.typeVal(ex, 'str')));
}

/**
 * Format paths
 * @param {*} pts 
 */
function fmtPaths(pts) {
  return fn.drop(pts.map(ex => fn.typeVal(ex, 'str') ? path.resolve(ex) : ''));
}

/**
 * Format patterns
 * @param {*} ptns 
 */
function fmtPatterns(ptns) {
  return fn.drop(ptns.map(ptn => {
    if (fn.typeOf(ptn, 'ptn')) {
      return ptn;
    } else if (fn.typeVal(ptn, 'str')) {
      return new RegExp(ptn.replace('.', '\\.').replace('*', '.*'));
    } else {
      return '';
    }
  }));
}

/**
 * Parse the target directory and generate it's structure tree.
 * @param target  string
 * @param options object
 */
function dirParser(target, options = {}) {
  if (!fs.statSync(target).isDirectory()) throw new Error('Target must be a directory!')

  const isGetDirTree = fn.typeOf(options.dirTree, 'bol') ? options.dirTree : true;
  const isReverse = fn.get(options, 'reverse', 'bol');
  const isNeedInfo = fn.get(options, 'needInfo', 'bol');
  const isFileOnly = fn.get(options, 'fileOnly', 'bol');
  const isDirOnly = fn.get(options, 'dirOnly', 'bol');
  const isFileFirst = fn.get(options, 'fileFirst', 'bol');
  const isGetFiles = fn.get(options, 'files', 'bol');
  const isGetChildren = fn.get(options, 'children', 'bol');
  const lineType = fn.get(options, 'lineType', 'str') || 'solid';
  let depth = fn.get(options, 'depth', 'num');
  if (!fn.isNum(depth)) depth = 0;

  const excludes = fmtMatchs(fn.get(options, 'excludes', 'arr') || []);
  const excPaths = fmtPaths(fn.get(options, 'excPaths', 'arr') || []);
  const excPatterns = fmtPatterns(fn.get(options, 'excPatterns', 'arr') || []);
  const includes = fmtMatchs(fn.get(options, 'includes', 'arr') || []);
  const paths = fmtPaths(fn.get(options, 'paths', 'arr') || []);
  const patterns = fmtPatterns(fn.get(options, 'patterns', 'arr') || []);

  let dirTree = '';
  const dirs = [];
  const files = [];
  const absTarget = path.resolve(target);
  const tarName = path.basename(absTarget)
  const tarInfo = new DirInfo(tarName, target);

  if (isGetChildren) {
    dirs.push({ path: target, info: tarInfo });
  }

  parseDir(target, tarInfo.children);

  /**
   * Parser The target directory
   * @param dirPath  string
   * @param deep     deep = 1
   * @param prev     prev = ''
   */
  function parseDir(dirPath, children, deep = 1, prev = '') {
    const subDirs = [];
    const subFiles = [];
    let filesSize = 0;

    // Classify directories and files of the dirPath
    const dirPathArr = fs.readdirSync(dirPath);
    let dirPaths = [];
    symbolsOrder.forEach(symbol => {
      dirPaths = dirPaths.concat(fn.filter(dirPathArr, path_ => path_.startsWith(symbol)));
    });
    dirPaths = dirPaths.concat(fn.reject(dirPathArr, path_ => {
      return symbolsOrder.some(symbol => path_.startsWith(symbol));
    }));
    if (isReverse) {
      dirPaths.reverse();
    }
    dirPaths.forEach(path_ => {
      const iPath = path.join(dirPath, path_);
      const iPath_ = iPath.replace(/\\/mg, '/');
      const isExclude = excludes.includes(path_) || excPaths.some(ePath => iPath === ePath);
      const isRejects = isExclude || excPatterns.some(ptn => !!iPath.match(ptn) || !!iPath_.match(ptn));
      if (!isRejects) {
        const stat = fs.statSync(iPath);
        const memberInfo = { name: path_, path: iPath };
        if (stat.isDirectory()) {
          subDirs.push(memberInfo);
        } else if (stat.isFile()) {
          subFiles.push(memberInfo);
        }
      }
    });

    if (isDirOnly) {
      directoriesHandler();
    } else if (isFileFirst) {
      filesHandler();
      directoriesHandler();
    } else {
      directoriesHandler();
      filesHandler();
    }

    /**
     * handle directories
     */
    function directoriesHandler() {
      let split = '';
      let dirInfo = {};
      subDirs.forEach((dir, i) => {
        if (isGetChildren) {
          dirInfo = new DirInfo(dir.name, dir.path);
          dirs.push({ path: dirInfo.path, info: dirInfo });
          children.push(dirInfo);
        }
        if (isGetDirTree) {
          const isMiddleDir = i < subDirs.length - 1 || (!isDirOnly && !isFileFirst && subFiles.length > 0);
          if (lineType === 'dashed') {
            if (isMiddleDir) {
              dirTree += `${prev} +-- ${dir.name}\r\n`;
              split = ' ¦  ';
            } else {
              dirTree += `${prev} +-- ${dir.name}\r\n`;
              split = '    ';
            }
          } else {
            if (isMiddleDir) {
              dirTree += `${prev} ├─ ${dir.name}\r\n`;
              split = ' │';
            } else {
              dirTree += `${prev} └─ ${dir.name}\r\n`;
              split = '  ';
            }
          }
        }
        if (!depth || deep < depth) {
          const nextPath = path.join(dirPath, dir.name);
          const nextMemb = isGetChildren ? dirInfo.children : children;
          const nextDeep = deep + 1;
          const nextSplit = prev + split;
          parseDir(nextPath, nextMemb, nextDeep, nextSplit);
        }
      });
    }

    /**
     * Handle files
     */
    function filesHandler() {
      subFiles.forEach((file, i) => {
        if (isGetChildren || isGetFiles) {
          const fileInfo = new FileInfo(file.name, file.path);
          if (isGetFiles) {
            files.push(fileInfo);
          }
          if (isGetChildren) {
            children.push(fileInfo);
          }
          filesSize += fileInfo.size;
        }
        if (isGetDirTree) {
          if (lineType === 'dashed') {
            if (i < subFiles.length - 1 || (isFileFirst && subDirs.length > 0)) {
              dirTree += `${prev} +-- ${file.name}\r\n`;
            } else {
              dirTree += `${prev} +-- ${file.name}\r\n`;
            }
          } else {
            if (i < subFiles.length - 1 || (isFileFirst && subDirs.length > 0)) {
              dirTree += `${prev} ├─ ${file.name}\r\n`;
            } else {
              dirTree += `${prev} └─ ${file.name}\r\n`;
            }
          }
        }
      });
    }

    if (isGetChildren) {
      dirs.forEach(dir => {
        if (dirPath.includes(dir.path)) {
          dir.info.dirNum += subDirs.length;
          dir.info.fileNum += subFiles.length;
          dir.info.size += filesSize;
          dir.info.size_kb = calcSizekb(dir.info.size);
        }
      });
    } else {
      tarInfo.dirNum += subDirs.length;
      tarInfo.fileNum += subFiles.length;
    }
  }

  if (!isGetChildren) {
    delete tarInfo.children;
    if (!isGetFiles) {
      delete tarInfo.size;
      delete tarInfo.size_kb;
    }
  }
  if (isGetFiles) {
    tarInfo.files = files;
    tarInfo.size = files.reduce((size, file) => size + file.size, tarInfo.size);
    tarInfo.size_kb = calcSizekb(tarInfo.size);
  }
  if (isGetDirTree) {
    if (isNeedInfo) {
      dirTree = `${tarName}\r\n${dirTree}`;
    } else if (isDirOnly) {
      dirTree = `${tarName} ( directories: ${tarInfo.dirNum} )\r\n${dirTree}`;
    } else {
      dirTree = `${tarName} ( directories: ${tarInfo.dirNum}, Files: ${tarInfo.fileNum} )\r\n${dirTree}`;
    }
    tarInfo.dirTree = dirTree.replace(/\r\n$/, '');
  }

  return tarInfo;
}
