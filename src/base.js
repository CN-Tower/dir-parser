const fs = require('fs');
const path = require('path');

function calcSizekb(size){
  return `${Math.round((size / 1024) * 100) / 100}kb`;
}

exports.DirInfo = class DirInfo {
  constructor(name, dirPath) {
    this.name = name;
    this.type = 'directory';
    this.size = 0;
    this.size_kb = 0;
    this.path = dirPath;
    this.absPath = path.resolve(dirPath);
    this.dir = path.dirname(dirPath);
    this.absDir = path.dirname(this.absPath);
    this.dirNum = 0;
    this.fileNum = 0;
    this.children = [];
  }
}

exports.FileInfo = class FileInfo {
  constructor (name, filePath) {
    const infos = path.parse(filePath);
    this.name = name;
    this.base = infos.name;
    this.ext = infos.ext;
    this.type = 'file';
    this.size = fs.statSync(filePath).size;
    this.size_kb = calcSizekb(this.size);
    this.path = filePath;
    this.absPath = path.resolve(filePath);
    this.dir = infos.dir;
    this.absDir = path.dirname(this.absPath);
  }
}

exports.calcSizekb = calcSizekb;