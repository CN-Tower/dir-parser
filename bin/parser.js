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
  .option('-x, --excPaths [excPaths]', 'Exclude some directories or files by path')
  .option('-r, --patterns [patterns]', 'Reject some directories or files by RegExp')
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
  || fn.get(config, 'excludes', 'arr')
  || [];
let excPaths = program.excPaths
  || fn.get(config, 'excPaths', 'arr')
  || [];
let patterns = program.patterns
  || fn.get(config, 'patterns', 'arr')
  || [];
const noNum = program.noNum || fn.get(config, 'noNum', 'bol');
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
function excHandler(exc, type_) {
  if (fn.typeOf(exc, 'str')) {
    exc = rmQuote(exc);
    if (exc.startsWith('[')) {
      try {
        eval('exc =' + exc);
      } catch (e) {
        exc = fn.get(config, type_, 'arr') || [];
      }
    } else {
      exc = exc.split(',');
    }
  }
  return fn.toArr(exc);
}
patterns = excHandler(patterns, 'patterns');
excludes = excHandler(excludes, 'excludes');
excPaths = excHandler(excPaths, 'excPaths');
excPaths.push(dirInfoFile);

/**
 * Parse by options
 */
parse(target, {
  'excludes': excludes,
  'excPaths': excPaths,
  'patterns': patterns,
  'noNum': noNum
}).then(
  parsed => {
    if (!silent) console.log(parsed.dirTree);
    fn.wt(output, parsed.dirTree);
  },
  error => {
    console.log(fn.chalk(error.message, 'red'));
  }
);
