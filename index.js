#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const fn = require('funclib');
const program = require('commander');
const package = require('./package.json');

let config = {};
let count = {dirs: 0, files: 0}
let parseResult = '';
const dirInfoFile = 'dir-info.txt';

program
  .version(package.version)
  .option('-v, --version')
  .option('-d, --directory [directory]', 'The target directory, default: "./"')
  .option('-o, --output [output]', 'Parse result output path, default: "./"')
  .option('-e, --excludes [excludes]', 'Exclude some directories or files by name')
  .option('-x, --exdPaths [exdPaths]', 'Exclude some directories or files by path')
  .option('-c, --config [config]', 'Parser config file')
  .option('-s, --silent', 'Don\'t print the parse-result in terminal')
  .option('-n, --noNum', 'Don\'t show file and directory number')
  .parse(process.argv);

if (program.config) config = require(path.resolve(program.config));

let target = program.directory || fn.get(config, 'directory', 'str') || path.resolve('./');
let output = program.output || fn.get(config, 'output', 'str') || path.resolve('./');
let excludes = program.excludes || fn.get(config, 'excludes', 'arr', 'str') || [];
let exdPaths = program.exdPaths || fn.get(config, 'exdPaths', 'arr', 'str') || [];
const noNum = program.noNum || fn.get(config, 'noNum', 'bol') || false;
const silent = program.silent;


target = rmQuote(target);
output = rmQuote(output);

excludes = excludesHandler(excludes, 'excludes');
exdPaths = excludesHandler(exdPaths, 'exdPaths');
exdPaths.push(dirInfoFile);
exdPaths = exdPaths.map(exdPath => {
  return path.resolve(exdPath);
});

function rmQuote(str) {
  return str.replace(/^['"`]|['"`]$/mg, '');
}

function excludesHandler(ecd, item) {
  if (fn.typeOf(ecd, 'str')) {
    ecd = rmQuote(ecd);
    if (ecd.startsWith('[')) {
      try {
        eval('ecd =' + ecd);
      } catch (e) {
        ecd = fn.get(config, item, 'arr', 'str') || [];
      }
    } else {
      ecd = ecd.split(',');
    }
  }
  return fn.toArr(ecd);
}

const targetStat = fs.statSync(target);
if (!targetStat.isDirectory) {
  throw new Error('Target must be a directory!')
}
const outputStat = fs.statSync(output);
if (!outputStat.isDirectory || !outputStat.isFile) {
  throw new Error('Output must be a file or a directory!')
}
if (outputStat.isDirectory) {
  output = path.join(output, dirInfoFile)
}

function parseTarget(target, deep = 1, prev = '') {
  let split = '';
  const dirinfo = fs.readdirSync(target);
  const dirs = [];
  const files = [];

  for (let i = 0; i < dirinfo.length; i++) {
    const itPath = path.join(target, dirinfo[i]);
    if (!excludes.includes(dirinfo[i]) && !exdPaths.some(ep => itPath === ep)) {
      const stat = fs.statSync(itPath);
      if (stat.isDirectory()) {
        dirs.push(dirinfo[i]);
      } else if (stat.isFile) {
        files.push(dirinfo[i]);
      }
    }
  }

  count.dirs += dirs.length;
  count.files += files.length;

  for (let i = 0; i < dirs.length; i++) {
    if (i === dirs.length - 1 && files.length === 0) {
      parseResult += `${prev} └─ ${dirs[i]}\n`;
      split = '  ';
    } else {
      parseResult += `${prev} ├─ ${dirs[i]}\n`;
      split = ' │';
    }
    const nextPath = path.join(target, dirs[i]);
    const nextdeep = deep + 1;
    parseTarget(nextPath, nextdeep, prev + split);
  }

  for (let i = files.length - 1; i >= 0; i--) {
    if (i === 0) {
      parseResult += `${prev} └─ ${files[i]}\n`;
    } else {
      parseResult += `${prev} ├─ ${files[i]}\n`;
    }
  }
}

parseTarget(target);

const dirName = path.basename(target)
if (noNum) {
  parseResult = `${dirName}\n${parseResult}`;
} else {
  parseResult = `${dirName} ( Directorys: ${count.dirs}, Files: ${count.files} )\n${parseResult}`;
}

if (!silent) {
  console.log(parseResult);
}
fn.wt(output, parseResult);