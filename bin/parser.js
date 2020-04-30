#!/usr/bin/env node

const fs = require('fs');
const fn = require('funclib');
const path = require('path');
const program = require('commander');
const package = require('../package.json');
const parser = require('../src/dir-parser');

const dirInfoFile = 'dir-info.txt';

/**
 * Get command arguments
 */
program.version(package.version)
  .option('-v, --version')
  .option('-i, --input [input]', 'Target directory, default: "./"')
  .option('-o, --output [output]', 'Output path, default: "./"')
  .option('-d, --depth [depth]', 'Depth of the directory (int, 0 means no limit), default: 0.')
  .option('-l, --lineType [lineType]', 'Line type of tree (dashed | solid), default: solid.')
  .option('-e, --excludes [excludes]', 'Exclude some directories or files by name.')
  .option('-x, --excPaths [excPaths]', 'Exclude some directories or files by path.')
  .option('-r, --patterns [patterns]', 'Exclude some directories or files by RegExp.')
  .option('-c, --config [config]', 'Parser config file.')
  .option('-S, --silent', 'Not print the parse-result in terminal.')
  .option('-G, --generate', 'Generate dir-info file under the output path.')
  .option('-N, --noNum', 'Not show file and directory number.')
  .option('-D, --dirOnly', 'Only pase the directories.')
  .option('-F, --fileFirst', 'Print files first, before than directories.')
  .parse(process.argv);

let config = {};
if (program.config) {
  config = require(path.resolve(program.config));
}
let target = program.input
  || fn.get(config, 'input', 'str')
  || path.resolve('./');
let output = program.output
  || fn.get(config, 'output', 'str')
  || path.resolve('./');
let depth = parseInt(program.depth)
  || parseInt(fn.get(config, 'depth', 'str'))
  || 0;
let lineType = program.lineType
  || fn.get(config, 'lineType', 'str')
  || 'solid';
let excludes = program.excludes
  || fn.get(config, 'excludes', 'arr')
  || [];
let excPaths = program.excPaths
  || fn.get(config, 'excPaths', 'arr')
  || [];
let patterns = program.patterns
  || fn.get(config, 'patterns', 'arr')
  || [];
const silent = program.silent || fn.get(config, 'silent', 'bol');
const generate = program.generate || fn.get(config, 'generate', 'bol');
const noNum = program.noNum || fn.get(config, 'noNum', 'bol');
const dirOnly = program.dirOnly || fn.get(config, 'dirOnly', 'bol');
const fileFirst = program.fileFirst || fn.get(config, 'fileFirst', 'bol');

// fn.log({
//   target, output, depth, lineType, excludes, excPaths,
//   patterns, silent, generate, noNum, fileFirst, dirOnly
// }, '#Cmd Params');

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
parser(target, { depth, lineType, excludes, excPaths, patterns, noNum, dirOnly, fileFirst }).then(
  parsed => {
    if (!silent) console.log(parsed.dirTree);
    if (generate || silent) fn.wt(output, parsed.dirTree);
  },
  error => {
    console.log(fn.chalk(error.message, 'red'));
  }
);
