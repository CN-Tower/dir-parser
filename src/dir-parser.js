const fs = require('fs');
const path = require('path');
const { drop, typeVal, typeOf, get, isNum } = require('funclib/lib');
const { DirInfo, FileInfo, calcSizekb } = require('./base');

/**
 * Order of dir name's or file name's special first char.
 */
const charOrder = ['_', '-', '.', '(', ')', '@', '&', '#', '^', '+', '~', '$'];

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
  return drop(exs.map(ex => typeVal(ex, 'str')));
}

/**
 * Format paths
 * @param {*} pts 
 */
function fmtPaths(pts) {
  return drop(pts.map(ex => typeVal(ex, 'str') ? path.resolve(ex) : ''));
}

/**
 * Format patterns
 * @param {*} ptns 
 */
function fmtPatterns(ptns) {
  return drop(ptns.map(ptn => {
    if (typeOf(ptn, 'ptn')) {
      return ptn;
    } else if (typeVal(ptn, 'str')) {
      return new RegExp(ptn.replace(/(\*?)\.([\w\d]*\$+)$/, () => `${RegExp.$1 && '\.*' || ''}\.${RegExp.$2}`));
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
  if (!fs.statSync(target).isDirectory()) {
    throw new Error('Target must be a directory!');
  }

  let depth = get(options, 'depth', 'num');
  if (!isNum(depth)) depth = 0;

  const isReverse = get(options, 'reverse', 'bol');
  const isFileFirst = get(options, 'fileFirst', 'bol');
  const isFileOnly = get(options, 'fileOnly', 'bol');
  const isDirOnly = isFileOnly ? false : get(options, 'dirOnly', 'bol');
  const isHideDirInfo = !get(options, 'dirInfo', 'bol');
  const isGetFiles = get(options, 'getFiles', 'bol');
  const isGetChildren = get(options, 'getChildren', 'bol');
  const isGetDirTree = typeOf(options.dirTree, 'bol') ? options.dirTree : true;
  const lineType = get(options, 'lineType', 'str') || 'solid';
  const excludes = fmtMatchs(get(options, 'excludes', 'arr') || []);
  const excPaths = fmtPaths(get(options, 'excPaths', 'arr') || []);
  const excPatterns = fmtPatterns(get(options, 'excPatterns', 'arr') || []);
  const ignores = fmtMatchs(get(options, 'ignores', 'arr') || []);
  const includes = fmtMatchs(get(options, 'includes', 'arr') || []);
  const paths = fmtPaths(get(options, 'paths', 'arr') || []);
  const patterns = fmtPatterns(get(options, 'patterns', 'arr') || []);

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
    let filesSize = 0;
    const subDirs = [];
    const subFiles = [];
    const dirSubArr = fs.readdirSync(dirPath);

    let dirSubs = [], i = -1;
    charOrder.forEach(char => {
      while (++i < dirSubArr.length) {
        if (dirSubArr[i] && dirSubArr[i].startsWith(char)) {
          dirSubs = dirSubs.concat(dirSubArr.splice(i, 1));
          i --;
        }
      }
    });
    dirSubs = dirSubs.concat(dirSubArr);
    if (isReverse) dirSubs.reverse();

    getOrCheckValidSubs(dirPath, dirSubs, deep, false, subDirs, subFiles);

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
        if (!isFileOnly || dir.hasSubs) {
          if (isGetChildren) {
            dirInfo = new DirInfo(dir.name, dir.path);
            dirs.push({ path: dirInfo.path, info: dirInfo });
            children.push(dirInfo);
          }
          if (isGetDirTree) {
            const isMiddleDir = i < subDirs.length - 1 || (!isDirOnly && !isFileFirst && subFiles.length > 0);
            const isShowDMark = !dir.hasSubs || dir.ignored || depth && deep === depth;
            const dirEndMark = isShowDMark ? (dir.hasSubs && !dir.ignored ? '/*' : '/') : '';
            if (lineType === 'dashed') {
              if (isMiddleDir) {
                dirTree += `${prev} +-- ${dir.name}${dirEndMark}\r\n`;
                split = ' ¦  ';
              } else {
                dirTree += `${prev} +-- ${dir.name}${dirEndMark}\r\n`;
                split = '    ';
              }
            } else {
              if (isMiddleDir) {
                dirTree += `${prev} ├─ ${dir.name}${dirEndMark}\r\n`;
                split = ' │';
              } else {
                dirTree += `${prev} └─ ${dir.name}${dirEndMark}\r\n`;
                split = '  ';
              }
            }
          }
          if (!dir.ignored && (!depth || deep < depth)) {
            const nextPath = path.join(dirPath, dir.name);
            const nextMemb = isGetChildren ? dirInfo.children : children;
            const nextDeep = deep + 1;
            const nextSplit = prev + split;
            parseDir(nextPath, nextMemb, nextDeep, nextSplit);
          }
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

  /**
   * Get or check has valid sub dir or sub files.
   * @param {*} dirPath 
   * @param {*} deep 
   */
  function getOrCheckValidSubs(dirPath, dirSubs, deep, isCheck, subDirs = [], subFiles = []) {
    let i = -1;
    while(++i < dirSubs.length) {
      const sub = dirSubs[i];
      const iPath = path.join(dirPath, sub);
      const sPath = iPath.replace(/\\/mg, '/');
      const isExclude = excludes.includes(sub)
        || excPaths.some(pth => iPath === pth || pth.endsWith(iPath))
        || excPatterns.some(ptn => iPath.match(ptn) || sPath.match(ptn));
      if (!isExclude) {
        const isIgnore = ignores.length && ignores.includes(sub);
        const isInclude = (!includes.length || includes.includes(sub))
          && (!paths.length || paths.some(pth => iPath === pth || pth.endsWith(iPath)))
          && (!patterns.length || patterns.some(ptn => iPath.match(ptn) || sPath.match(ptn)));
        const stat = fs.statSync(iPath);
        const iDir = { name: sub, path: iPath };
        if (stat.isDirectory()) {
          if (getOrCheckValidSubs(iPath, fs.readdirSync(iPath), deep + 1, true)) {
            if (!isFileOnly || (!depth || deep < depth)) {
              if (isCheck) return true;
              subDirs.push({...iDir, hasSubs: true, ignored: isIgnore});
            }
          } else if (isInclude && !isFileOnly) {
            if (isCheck && isDirOnly) return true;
            subDirs.push({...iDir, hasSubs: false, ignored: isIgnore});
          }
        } else if (stat.isFile() && !isIgnore && isInclude) {
          if (isCheck && isFileOnly) return true;
          subFiles.push(iDir);
        }
      }
    }
    if (isCheck) {
      if (isDirOnly) {
        return subDirs.length;
      } else if (isFileOnly) {
        return subFiles.length || ((!depth || deep < depth) && subDirs.some(dir => dir.hasSubs));
      } else {
        return subDirs.length || subFiles.length || subDirs.some(dir => dir.hasSubs);
      }
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
    if (isHideDirInfo) {
      dirTree = `${tarName}\r\n${dirTree}`;
    } else if (isDirOnly) {
      dirTree = `${tarName} ( Directories: ${tarInfo.dirNum} )\r\n${dirTree}`;
    } else {
      dirTree = `${tarName} ( Directories: ${tarInfo.dirNum}, Files: ${tarInfo.fileNum} )\r\n${dirTree}`;
    }
    tarInfo.dirTree = dirTree.replace(/\r\n$/, '');
  }

  return tarInfo;
}
