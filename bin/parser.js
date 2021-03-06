#!/usr/bin/env node

const fs = require('fs');
const fn = require('funclib');
const path = require('path');
const program = require('commander');
const package = require('../package.json');
const parser = require('../src/dir-parser');

program.version(package.version)
  .option('-v, --version', 'output the version number')
  .option('-c, --config [config]', 'config file, Optional.')
  .option('-i, --input <input>', 'target directory', './')
  .option('-o, --output <output>', 'output path', './')
  .option('-d, --depth <depth>', 'depth of a parse process, 0 means no limit', 0)
  .option('-l, --lineType <lineType>', 'line type of tree, "dashed" or "solid"', 'solid')
  .option('-e, --excludes <excludes..>', 'exclude some directories or files by name.')
  .option('-x, --excPaths <excPaths..>', 'exclude directories or files by path.')
  .option('-p, --patterns <patterns...>', 'filter directories or files by RegExp.')
  .option('-g, --generate [fileName]', 'generate a dir-info file to the output path, "dir-info.txt" is default.')
  .option('-r, --reverse', 'reverse the parsed dir-tree nodes.')
  .option('-s, --silent', 'not show the parsed dir-tree in terminal.')
  .option('-f, --fileFirst', 'print files first, before directories.')
  .option('-F, --fileOnly', 'Pase files only.')
  .option('-D, --dirOnly', 'Pase directories only, and it only takes effect when fileOnly is false.')
  .option('-I, --ignores <ignores..>', 'ignore some directories or files by name.')
  .option('-N, --no-dirInfo', 'hide file and directory number info on the result top.')
  .option('--paths <paths..>', 'filter directories or files by path.')
  .option('--includes <includes..>', 'filter directories or files by name.')
  .option('--excPatterns <excPatterns...>', 'exclude directories or files by RegExp.')
  .option('-H, --Help', 'output chinese usage information.(打印中文帮助信息.)')
  .parse(process.argv);

let config = {};
if (program.config) {
  config = require(path.resolve(program.config));
}

const target      = rmQuote(program.input || fn.get(config, 'input', 'str') || path.resolve('./'));
const output      = rmQuote(program.output || fn.get(config, 'output', 'str') || path.resolve('./'));
const lineType    = program.lineType || fn.get(config, 'lineType', 'str') || 'solid';
const depth       = parseInt(program.depth) || parseInt(fn.get(config, 'depth', 'str')) || 0;
const excludes    = matchHandler(program.excludes || fn.get(config, 'excludes', 'arr') || [], 'excludes');
const excPaths    = matchHandler(program.excPaths || fn.get(config, 'excPaths', 'arr') || [], 'excPaths');
const excPatterns = matchHandler(program.excPatterns || fn.get(config, 'excPatterns', 'arr') || [], 'excPatterns');
const ignores     = matchHandler(program.ignores || fn.get(config, 'ignores', 'arr') || [], 'ignores');
const includes    = matchHandler(program.includes || fn.get(config, 'includes', 'arr') || [], 'includes');
const paths       = matchHandler(program.paths || fn.get(config, 'paths', 'arr') || [], 'paths');
const patterns    = matchHandler(program.patterns || fn.get(config, 'patterns', 'arr') || [], 'patterns');
const generate    = program.generate || fn.get(config, 'generate');
const reverse     = program.reverse || fn.get(config, 'reverse', 'bol');
const silent      = program.silent || fn.get(config, 'silent', 'bol');
const fileFirst   = program.fileFirst || fn.get(config, 'fileFirst', 'bol');
const fileOnly    = program.fileOnly || fn.get(config, 'fileOnly', 'bol');
const dirOnly     = program.dirOnly || fn.get(config, 'dirOnly', 'bol');
const dInfo       = program.dirInfo || fn.get(config, 'dirInfo', 'bol');
const dirInfo     = fn.isBol(dInfo) ? dInfo : true;
const outputName = fn.isStr(generate) && generate || 'dir-info.txt';

if (!fs.statSync(target).isDirectory()) {
  throw new Error('Target must be a directory!')
}
const outputStat = fs.statSync(output);
if (!outputStat.isDirectory() && !outputStat.isFile()) {
  throw new Error('Output must be a file or a directory!')
}
if (outputStat.isDirectory()) {
  outputFile = path.join(output, outputName)
}
excPaths.push(outputFile);

/**
 * Format the target and output
 */
function rmQuote(str) {
  return str.replace(/^['"`]|['"`]$/mg, '');
}

/**
 * Format the matchs
 */
function matchHandler(match, type_) {
  if (fn.typeOf(match, 'str')) {
    match = rmQuote(match);
    if (match.startsWith('[')) {
      try {
        eval('match =' + match);
      } catch (e) {
        match = fn.get(config, type_, 'arr') || [];
      }
    } else {
      match = match.split(',');
    }
  }
  return fn.toArr(match);
}

/**
 * Log the parameters
 */
// fn.log({
//   target, output, depth, lineType, excludes, excPaths, excPatterns, ignores, includes,
//   paths, patterns, reverse, silent, generate, dirInfo, fileFirst, fileOnly, dirOnly,
// }, '#Cmd Params');

/**
 * Parse target dir by options
 */
parser(target, {
  depth, reverse, lineType, excludes, excPaths, excPatterns, ignores,
  includes, paths, patterns, dirInfo, fileFirst, fileOnly, dirOnly,
}).then(
  parsed => {
    if (!silent) console.log(parsed.dirTree);
    if (generate || silent) fn.wt(outputFile, parsed.dirTree);
  },
  error => {
    console.log(fn.chalk(error.message, 'red'));
  }
);
