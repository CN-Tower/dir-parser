#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Parse the target directory and generate it's structure tree.
 * @param target  string
 * @param options object
 */
module.exports = function (target, options = {}) {

  if (!fs.statSync(target).isDirectory()) {
    throw new Error('Target must be a directory!')
  }

  let fileNum = 0;
  let dirNum = 0;
  let dirTree = '';
  const noNum = options.noNum || false;
  const dirName = path.basename(path.resolve(target))
  const excludes = options.excludes || [];
  const exdPaths = (options.exdPaths || []).map(ex => path.resolve(ex));

  /**
   * Parser The target directory
   * @param dirPath  string
   * @param deep     deep = 1
   * @param prev     prev = ''
   */
  function parseDir(dirPath, deep = 1, prev = '') {
    const subDirs = [];
    const subFiles = [];

    // Classify directorys and files of the dirPath
    fs.readdirSync(dirPath).forEach(item => {
      const itPath = path.join(dirPath, item);
      const isExdPath = exdPaths.some(ePath => itPath === ePath);
      if (!isExdPath && !excludes.includes(item)) {
        const stat = fs.statSync(itPath);
        if (stat.isDirectory()) {
          subDirs.push(item);
        } else if (stat.isFile()) {
          subFiles.push(item);
        }
      }
    });
    dirNum += subDirs.length;
    fileNum += subFiles.length;
  
    // handle directorys
    let split = '';
    subDirs.forEach((dir, i) => {
      if (i < subDirs.length - 1 || subFiles.length > 0) {
        dirTree += `${prev} ├─ ${dir}\r\n`;
        split = ' │';
      } else {
        dirTree += `${prev} └─ ${dir}\r\n`;
        split = '  ';
      }
      const nextPath = path.join(dirPath, dir);
      const nextDeep = deep + 1;
      const nextSplit = prev + split;
      parseDir(nextPath, nextDeep, nextSplit);
    });

    // Handle files
    subFiles.forEach((file, i) => {
      if (i < subFiles.length - 1) {
        dirTree += `${prev} ├─ ${file}\r\n`;
      } else {
        dirTree += `${prev} └─ ${file}\r\n`;
      }
    });
  }

  parseDir(target);

  if (noNum) {
    dirTree = `${dirName}\r\n${dirTree}`;
  } else {
    dirTree = `${dirName} ( Directorys: ${dirNum}, Files: ${fileNum} )\r\n${dirTree}`;
  }

  return {
    'fileNum': fileNum,
    'dirNum': dirNum,
    'dirName': dirName,
    'dirTree': dirTree.replace(/\r\n$/, '')
  }
}

