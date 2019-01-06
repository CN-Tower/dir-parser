#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { DirInfo, FileInfo, calcSizekb } = require('./base');

/**
 * Parse the target directory and generate it's structure tree.
 * @param target  string
 * @param options object
 */
module.exports = function (target, options = {}) {
  if (!fs.statSync(target).isDirectory()) {
    throw new Error('Target must be a directory!')
  }

  let isGetDirTree = typeof options.dirTree === 'boolean' ? options.tree : true;
  const isGetMembers = !!options.members;
  const isGetFiles = !!options.files;
  const noNum = !!options.noNum;
  const absTarget = path.resolve(target);
  const tarName = path.basename(absTarget)
  const excludes = options.excludes || [];
  const exdPaths = (options.exdPaths || []).map(ex => path.resolve(ex));
  const tarInfo = new DirInfo(tarName, target);

  let dirTree = '';
  const dirs = [];
  const files = [];

  if (isGetMembers) {
    dirs.push({
      'path': target,
      'info': tarInfo
    });
  }

  /**
   * Parser The target directory
   * @param dirPath  string
   * @param deep     deep = 1
   * @param prev     prev = ''
   */
  function parseDir(dirPath, members, deep = 1, prev = '') {
    const subDirs = [];
    const subFiles = [];
    let filesSize = 0;

    // Classify directorys and files of the dirPath
    fs.readdirSync(dirPath).forEach(item => {
      const iPath = path.join(dirPath, item);
      const isExdPath = exdPaths.some(ePath => iPath === ePath);
      if (!isExdPath && !excludes.includes(item)) {
        const stat = fs.statSync(iPath);
        const memberInfo = {
          'name': item,
          'path': iPath
        };
        if (stat.isDirectory()) {
          subDirs.push(memberInfo);
        } else if (stat.isFile()) {
          subFiles.push(memberInfo);
        }
      }
    });

    // handle directorys
    let split = '';
    let dirInfo = {};
    subDirs.forEach((dir, i) => {
      if (isGetMembers) {
        dirInfo = new DirInfo(dir.name, dir.path);
        dirs.push({
          'path': dirInfo.path,
          'info': dirInfo
        });
        members.push(dirInfo);
      }
      if (isGetDirTree) {
        if (i < subDirs.length - 1 || subFiles.length > 0) {
          dirTree += `${prev} ├─ ${dir.name}\r\n`;
          split = ' │';
        } else {
          dirTree += `${prev} └─ ${dir.name}\r\n`;
          split = '  ';
        }
      }
      const nextPath = path.join(dirPath, dir.name);
      const nextMemb = isGetMembers ? dirInfo.members : members;
      const nextDeep = deep + 1;
      const nextSplit = prev + split;
      parseDir(nextPath, nextMemb, nextDeep, nextSplit);
    });

    // Handle files
    subFiles.forEach((file, i) => {
      if (isGetMembers || isGetFiles) {
        const fileInfo = new FileInfo(file.name, file.path);
        if (isGetFiles) {
          files.push(fileInfo);
        }
        if (isGetMembers) {
          members.push(fileInfo);
        }
        filesSize += fileInfo.size;
      }
      if (isGetDirTree) {
        if (i < subFiles.length - 1) {
          dirTree += `${prev} ├─ ${file.name}\r\n`;
        } else {
          dirTree += `${prev} └─ ${file.name}\r\n`;
        }
      }
    });

    if (isGetMembers) {
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

  parseDir(target, tarInfo.members);

  if (!isGetMembers) {
    delete tarInfo.members;
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
    if (noNum) {
      dirTree = `${tarName}\r\n${dirTree}`;
    } else {
      dirTree = `${tarName} ( Directorys: ${tarInfo.dirNum}, Files: ${tarInfo.fileNum} )\r\n${dirTree}`;
    }
    tarInfo.dirTree = dirTree.replace(/\r\n$/, '');
  }

  return tarInfo;
}

