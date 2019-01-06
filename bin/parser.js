#!/usr/bin/env node

const fs = require('fs');
const fn = require('funclib');
const path = require('path');
const program = require('commander');
const package = require('../package.json');
const parse = require('../src/dir-parser');

const dirInfoFile = 'dir-info.txt';

/**
 * Get command arguments
 */
program.version(package.version)
  .option('-v, --version')
  .option('-d, --directory [directory]', 'The target directory, default: "./"')
  .option('-o, --output [output]', 'Parse result output path, default: "./"')
  .option('-e, --excludes [excludes]', 'Exclude some directories or files by name')
  .option('-x, --exdPaths [exdPaths]', 'Exclude some directories or files by path')
  .option('-c, --config [config]', 'Parser config file')
  .option('-s, --silent', 'Don\'t print the parse-result in terminal')
  .option('-n, --noNum', 'Don\'t show file and directory number')
  .parse(process.argv);

let config = {};
if (program.config) {
  config = require(path.resolve(program.config));
}
let target = program.directory
  || fn.get(config, 'directory', 'str')
  || path.resolve('./');
let output = program.output
  || fn.get(config, 'output', 'str')
  || path.resolve('./');
let excludes = program.excludes
  || fn.get(config, 'excludes', 'arr', 'str')
  || [];
let exdPaths = program.exdPaths
  || fn.get(config, 'exdPaths', 'arr', 'str')
  || [];
const noNum = program.noNum
  || fn.get(config, 'noNum', 'bol')
  || false;
const silent = program.silent;

/**
 * Format the target and output
 */
function rmQuote(str) {
  return str.replace(/^['"`]|['"`]$/mg, '');
}
target = rmQuote(target);
output = rmQuote(output);
if (!fs.statSync(target).isDirectory()) {
  throw new Error('Target must be a directory!')
}
const outputStat = fs.statSync(output);
if (!outputStat.isDirectory() && !outputStat.isFile()) {
  throw new Error('Output must be a file or a directory!')
}
if (outputStat.isDirectory()) {
  output = path.join(output, dirInfoFile)
}

/**
 * Format the exculds
 */
function exdHandler(ecd, item) {
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
excludes = exdHandler(excludes, 'excludes');
exdPaths = exdHandler(exdPaths, 'exdPaths');
exdPaths.push(dirInfoFile);

/**
 * Parse by options
 */
const parsed = parse(target, {
  'excludes': excludes,
  'exdPaths': exdPaths,
  'noNum': noNum
});

/**
 * The output
 */
if (!silent) {
  console.log(parsed.dirTree);
}
fn.wt(output, parsed.dirTree);