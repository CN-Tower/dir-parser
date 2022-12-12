<h1 align="center">😎 Dir Parser v2 😎</h1>
<p align="center">
  <img width="80%;" src="images/demo.png">
</p>

# dir-parser

[![npm](https://img.shields.io/npm/v/dir-parser.svg)](https://www.npmjs.com/package/dir-parser)
[![LICENSE MIT](https://img.shields.io/npm/l/dir-parser.svg)](https://www.npmjs.com/package/dir-parser) 
[![NPM Downloads](https://img.shields.io/npm/dm/dir-parser.svg?style=flat)](https://npmcharts.com/compare/dir-parser?minimal=true)
[![Install Size](https://packagephobia.now.sh/badge?p=dir-parser)](https://packagephobia.now.sh/result?p=dir-parser)

> Parse a directory and generate it's structure tree.

Read this in other languages: English | [简体中文](./README_zh-CN.md)

- [dir-parser](#dir-parser)
  - [1. What is dir-parser](#1-what-is-dir-parser)
    - [1.1 Brief introduce](#11-brief-introduce)
    - [1.2 Installation](#12-installation)
  - [2. Command Line](#2-command-line)
    - [2.1 Print help info](#21-print-help-info)
    - [2.2 Generate dir-tree](#22-generate-dir-tree)
    - [2.3 With parameters](#23-with-parameters)
      - [2.3.1 excludes](#231-excludes)
      - [2.3.2 ignores](#232-ignores)
      - [2.3.3 glob](#233-glob)
      - [2.3.4 patterns](#234-patterns)
      - [2.3.5 lineType](#235-lineType)
      - [2.3.6 depth](#236-depth)
      - [2.3.7 reverse](#237-reverse)
      - [2.3.8 fileFirst](#238-fileFirst)
      - [2.3.9 fileOnly](#239-fileOnly)
      - [2.3.10 dirOnly](#2310-dirOnly)
      - [2.3.11 dirInfo](#2311-dirInfo)
      - [2.3.12 excPaths](#2312-excPaths)
      - [2.3.13 excPatterns](#2313-excPatterns)
      - [2.3.14 silent](#2314-silent)
      - [2.3.15 generate](#2315-generate)
      - [2.3.16 config](#2316-config)
    - [2.4 Use multiple commands together](#24-use-multiple-commands-together)
  - [3. In JavaScript](#3-in-javascript)
    - [3.1 Interface](#31-interface)
      - [3.1.1 Main Function-parser](#311-main-function-parser)
      - [3.1.2 Options](#312-options)
      - [3.1.3 Parsed](#313-parsed)
      - [3.1.4 DirInfo](#314-dirinfo)
      - [3.1.5 FileInfo](#315-fileinfo)
    - [3.2 Get dir-tree](#32-get-dir-tree)
      - [3.2.1 Make dir-tree example](#321-make-dir-tree-example)
      - [3.2.2 Run dir-tree example](#322-run-dir-tree-example)
    - [3.3 Get dir-info](#33-get-dir-info)
      - [3.3.1 Make dir-info example](#331-make-dir-info-example)
      - [3.3.2 Run dir-info example](#332-run-dir-info-example)
      - [3.3.3 Make dir-children example](#333-make-dir-children-example)
      - [3.3.4 Run dir-children example](#334-run-dir-children-example)
      - [3.3.5 Make dir-files example](#335-make-dir-files-example)
      - [3.3.6 Run dir-files example](#336-run-dir-files-example)

## 1. What is dir-parser

### 1.1 Brief introduce
👍👍👍Dir parser is a powerful folder analysis tool based on nodejs, which can be used in command line or JavaScript code. There are many practical parameters that can be set to help you get the formatted folder tree and internal information.

### 1.2 Installation

#### 1.2.1 Global install
- yarn: `$ yarn global add dir-parser`
- npm: `$ npm install -g dir-parser`

#### 1.2.2 Local install
- yarn: `$ yarn add dir-parser` or `$ yarn add dir-parser -D`
- npm: `$ npm install dir-parser` or `$ npm install dir-parser -D`

## 2. Command Line

### 2.1 Print help info
`$ parser -h` (or: `$ parser --help`)
```
Usage: parser [options]

Options:
  -V, --version                   output the version number
  -v, --version                   output the version number
  -c, --config [config]           config file, Optional.
  -i, --input <input>             target directory (default: "./")
  -o, --output <output>           output path (default: "./")
  -d, --depth <depth>             depth of a parse process, 0 means no limit (default: 0)
  -l, --lineType <lineType>       line type of tree, "dash" or "solid" (default: "solid")
  -e, --excludes <excludes..>     exclude some directories or files by name.
  -x, --excPaths <excPaths..>     exclude directories or files by path.
  -p, --patterns <patterns...>    filter directories or files by RegExp.
  -g, --generate [fileName]       generate a dir-info file to the output path, "dir-info.txt" is default.
  -r, --reverse                   reverse the parsed dir-tree nodes.
  -s, --silent                    not show the parsed dir-tree in terminal.
  -f, --fileFirst                 print files first, before directories.
  -F, --fileOnly                  pase files only.
  -D, --dirOnly                   pase directories only, and it only takes effect when fileOnly is false.
  -I, --ignores <ignores..>       ignore some directories or files by name.
  -N, --no-dirInfo                hide file and directory number info on the result top.
  --paths <paths..>               filter directories or files by path.
  --includes <includes..>         filter directories or files by name.
  --excPatterns <excPatterns...>  exclude directories or files by RegExp.
  -H, --Help                      output chinese usage information.(打印中文帮助信息.)
  -h, --help                      output usage information
```

### 2.2 Generate dir-tree
To run demo, you need to install `express-generator`:<br>
Run: <br>
`$ npm install -g express-generator`<br>
`$ express myapp`<br>
`$ cd myapp`<br>
`$ parser`<br>
```
myapp ( Directories: 7, Files: 9 )
├── bin
│   └── www
├── public
│   ├── images/
│   ├── javascripts/
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
├── views
│   ├── error.jade
│   ├── index.jade
│   └── layout.jade
├── app.js
└── package.json
```

### 2.3 With parameters

#### 2.3.1 excludes
👉 Exclude some directories or files by name.<br>
`$ # git init`<br>
`$ npm install`<br>
`$ parser -e .git,node_modules,public`<br>
or: `$ parser --excludes .git,node_modules,public`
```
myapp ( Directories: 3, Files: 9 )
├── bin
│   └── www
├── routes
│   ├── index.js
│   └── users.js
├── views
│   ├── error.jade
│   ├── index.jade
│   └── layout.jade
├── app.js
├── package-lock.json
└── package.json
```
Name has white space:<br>
`$ touch 'white space.txt'`<br>
`$ parser -e '[".git", "node_modules", "public", "white space.txt"]'`<br>
`$ rm -rf white\ space.txt`
```
myapp ( Directories: 3, Files: 9 )
├── bin
│   └── www
├── routes
│   ├── index.js
│   └── users.js
├── views
│   ├── error.jade
│   ├── index.jade
│   └── layout.jade
├── app.js
├── package-lock.json
└── package.json
```

#### 2.3.2 ignores
👉 Ignore some directories or files by name.<br>
`$ parser -e node_modules -I bin,public`<br>
or: `$ parser -e node_modules --ignores bin,public`
```
myapp ( Directories: 4, Files: 8 )
├── bin/
├── public/
├── routes
│   ├── index.js
│   └── users.js
├── views
│   ├── error.jade
│   ├── index.jade
│   └── layout.jade
├── app.js
├── package-lock.json
└── package.json
```

#### 2.3.3 glob
👉 Filter by glob pattern. Note: glob pattern must be enclosed in quotation marks <br>
`$ parser -e node_modules -G '**/*.js'`<br>
or: `$ parser -e node_modules --glob '**/*.js'`
```
myapp ( Directories: 1, Files: 3 )
├── routes
│   ├── index.js
│   └── users.js
└── app.js
```

#### 2.3.4 patterns
👉 Filter directories or files by RegExp.<br>
`$ parser -e node_modules -p .js$`<br>
or: `$ parser -e node_modules --patterns .js$`
```
myapp ( Directories: 1, Files: 3 )
├── routes
│   ├── index.js
│   └── users.js
└── app.js
```

#### 2.3.5 lineType
👉 Line type of tree, "dash" or "solid" (default: "solid")<br>
`$ parser -e bin,node_modules -l dash`<br>
or: `$ parser -e bin,node_modules --lineType dash`
```
myapp ( Directories: 6, Files: 9 )
+-- public
¦   +-- images/
¦   +-- javascripts/
¦   +-- stylesheets
¦       +-- style.css
+-- routes
¦   +-- index.js
¦   +-- users.js
+-- views
¦   +-- error.jade
¦   +-- index.jade
¦   +-- layout.jade
+-- app.js
+-- package-lock.json
+-- package.json
```

#### 2.3.6 depth
👉 Depth of a parse process, 0 means no limit (default: 0)<br>
`$ parser -e node_modules,views -d 2`<br>
or: `$ parser -e node_modules,views --depth 2`
```
myapp ( Directories: 6, Files: 6 )
├── bin
│   └── www
├── public
│   ├── images/
│   ├── javascripts/
│   └── stylesheets/*
├── routes
│   ├── index.js
│   └── users.js
├── app.js
├── package-lock.json
└── package.json
```

#### 2.3.7 reverse
👉 Reverse the parsed dir-tree nodes.<br>
`$ parser -e node_modules,views -d 2 -r`<br>
or: `$ parser -e node_modules,views -d 2 --reverse`
```
myapp ( Directories: 6, Files: 6 )
├── routes
│   ├── users.js
│   └── index.js
├── public
│   ├── stylesheets/*
│   ├── javascripts/
│   └── images/
├── bin
│   └── www
├── package.json
├── package-lock.json
└── app.js
```

#### 2.3.8 fileFirst
👉 Print files first, before directories.<br>
`$ parser -e node_modules,bin,views -f`<br>
or: `$ parser -e node_modules,bin,views --fileFirst`
```
myapp ( Directories: 5, Files: 6 )
├── app.js
├── package-lock.json
├── package.json
├── public
│   ├── images/
│   ├── javascripts/
│   └── stylesheets
│       └── style.css
└── routes
    ├── index.js
    └── users.js
```

#### 2.3.9 fileOnly
👉 Pase files only.<br>
`$ parser -e node_modules,bin,views -F`<br>
or: `$ parser -e node_modules,bin,views --fileOnly`
```
myapp ( Directories: 3, Files: 6 )
├── public
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
├── app.js
├── package-lock.json
└── package.json
```

#### 2.3.10 dirOnly
👉 Pase directories only, and it only takes effect when fileOnly is false.<br>
`$ parser -e node_modules,bin,views -D`<br>
or: `$ parser -e node_modules,bin,views --dirOnly`
```
myapp ( Directories: 5 )
├── public
│   ├── images/
│   ├── javascripts/
│   └── stylesheets/
└── routes/
```

#### 2.3.11 dirInfo
👉 Hide file and directory number info on the result top.<br>
`$ parser -e node_modules,bin,public -N`<br>
or: `$ parser -e node_modules,bin,public --no-dirInfo`
```
myapp
├── routes
│   ├── index.js
│   └── users.js
├── views
│   ├── error.jade
│   ├── index.jade
│   └── layout.jade
├── app.js
├── package-lock.json
└── package.json
```

#### 2.3.12 excPaths
👉 Exclude directories or files by path.<br>
`$ parser -e node_modules,bin -x myapp/public`<br>
or: `$ parser -e node_modules,bin -excPath myapp/public`
```
myapp ( Directories: 2, Files: 8 )
├── routes
│   ├── index.js
│   └── users.js
├── views
│   ├── error.jade
│   ├── index.jade
│   └── layout.jade
├── app.js
├── package-lock.json
└── package.json
```

#### 2.3.13 excPatterns
👉 Exclude directories or files by RegExp.<br>
`$ parser -e node_modules,bin --excPatterns .jade$,.css$`
```
myapp ( Directories: 6, Files: 5 )
├── public
│   ├── images/
│   ├── javascripts/
│   └── stylesheets/
├── routes
│   ├── index.js
│   └── users.js
├── views/
├── app.js
├── package-lock.json
└── package.json
```

#### 2.3.14 silent
👉 Not show the parsed dir-tree in terminal.<br>
`$ parser -e node_modules,bin,public -s`<br>
or: `$ parser -e node_modules,bin,public --silent`

#### 2.3.15 generate
👉 Generate a dir-info file to the output path, "dir-info.txt" is default.<br>
`$ parser -e node_modules,bin,public -sg`<br>
or: `$ parser -e node_modules,bin,public -s --generate`<br>
`$ cat dir-info.txt`
```
myapp ( Directories: 2, Files: 8 )
├── routes
│   ├── index.js
│   └── users.js
├── views
│   ├── error.jade
│   ├── index.jade
│   └── layout.jade
├── app.js
├── package-lock.json
└── package.json
```

#### 2.3.16 config
👉 Config file, Optional.<br>
`$ touch parser.conf.json`<br>
`$ vi parser.conf.json`
```json
{
  "directory": "./",
  "excludes": [ ".git", "node_modules", "bin", "public", "parser.conf.json" ],
  "depth": "2",
  "generate": "info.txt"
}
```
`$ parser -c ./parser.conf.json`
```
myapp ( Directories: 2, Files: 9 )
├── routes
│   ├── index.js
│   └── users.js
├── views
│   ├── error.jade
│   ├── index.jade
│   └── layout.jade
├── app.js
├── dir-info.txt
├── package-lock.json
└── package.json
```

### 2.4 Use multiple commands together
`parser -e node_modules,bin -I views -d 2 -Nr`
```
myapp
├── views/
├── routes
│   ├── users.js
│   └── index.js
├── public
│   ├── stylesheets/*
│   ├── javascripts/
│   └── images/
├── parser.conf.json
├── package.json
├── package-lock.json
├── info.txt
├── dir-info.txt
└── app.js
```

## 3. In JavaScript

### 3.1 Interface

#### 3.1.1 Main Function-parser
```ts
parser(dirPath: string, options: Options): Promise<Parsed>
```

#### 3.1.2 Options
```ts
interface Options {             
  depth?: number;
  reverse?: boolean;
  fileFirst?: boolean;
  fileOnly?: boolean;
  dirOnly?: boolean;
  getFiles?: boolean;
  getChildren?: boolean;
  dirTree?: boolean;             // default: true
  dirInfo?: boolean;             // default: true
  lineType?: 'solid' | 'dash'; // default: 'solid'
  excludes?: Array<string>;      // eg: [ '.git', 'node_modules', '.idea' ];
  excPaths?: Array<string>;      // eg: [ 'src/app' ];
  excPatterns?: Array<string>;   // eg: [ 'src/*.js ]';
  ignores: Array<string>;        // eg: [ 'public' ];
  includes: Array<string>;       // eg: [ 'app.js' ];
  paths?: Array<string>;         // eg: [ 'src/public' ];
  patterns?: Array<string>;      // eg: [ '*.js ]';
  glob?: string;                 // eg: '**/*.js';
}
```
#### 3.1.3 Parsed
```ts
interface Parsed extends DirInfo {
  dirTree: string;
  children: Array<DirInfo | FileInfo>
  files: Array<FileInfo>
}
```

#### 3.1.4 DirInfo
```ts
interface DirInfo {
  name: string;
  type: 'directory';
  size: number;
  size_kb: number;
  path: string;
  absPath: string;
  dir: string;
  absDir: string;
  dirNum: number;
  fileNum: number;
  children: Array<DirInfo | FileInfo>
}
```

#### 3.1.5 FileInfo
```ts
interface FileInfo {
  name: string;
  base: string;
  ext: string;
  type: 'file';
  size: number;
  size_kb: number;
  path: string;
  absPath: string;
  dir: string;
  absDir: string;
}
```

### 3.2 Get dir-tree

#### 3.2.1 Make dir-tree example
`$ npm install dir-parser funclib`<br>
`$ touch test.js`<br>
`$ vi test.js`<br>
```js
const fn = require('funclib');
const parser = require('dir-parser');

parser('./', {
  excludes: ['.git', 'node_modules'],
  // lineType: 'dash',
  // fileFirst: true,
}).then(parsed => {
  fn.log(parsed.dirTree, '# parsed.dirTree');

  // fn.log(fn.pick(parsed, prop => prop !== 'dirTree'), '# parsed result info');
  // fn.log(parsed.children, '# parsed.children');
  // fn.log(parsed.files, '# parsed.files');
});
```

#### 3.2.2 Run dir-tree example
`$ node test.js`
```
==================================================================
                  [09:48:55] # parsed.dirTree
------------------------------------------------------------------
myapp
├── bin
│   └── www
├── public
│   ├── images/
│   ├── javascripts/
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
├── views
│   ├── error.jade
│   ├── index.jade
│   └── layout.jade
├── app.js
├── dir-info.txt
├── info.txt
├── package-lock.json
├── package.json
├── parser.conf.json
└── test.js
==================================================================
```

### 3.3 Get dir-info

#### 3.3.1 Make dir-info example 
`$ vi test.js`
```js
parser('./', {
  excludes: ['.git', 'node_modules'],
  // lineType: 'dash',
  // fileFirst: true,
}).then(parsed => {
  console.log(fn.pretty(fn.pick(parsed, prop => prop !== 'dirTree')));
  
  // fn.log(parsed.dirTree, '# parsed.dirTree');
  // fn.log(parsed.children, '# parsed.children');
  // fn.log(parsed.files, '# parsed.files');
});
```
#### 3.3.2 Run dir-info example 
`$ node test.js`
```json
{
  "name": "myapp",
  "type": "directory",
  "path": "./",
  "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp",
  "dir": ".",
  "absDir": "/Users/cntower/code/@cntower/dir-parser",
  "dirNum": 7,
  "fileNum": 14
}
```

#### 3.3.3 Make dir-children example 
`$ vi test.js`
```js
parser('./', {
  excludes: ['.git', 'node_modules', 'public'],
  getFiles: true,    // Default is false, If true, returns will conatins an array of all subfiles's info;
  getChildren: true, // Default is false, If true, returns will conatins an object of all children's info;
  dirTree: false     // Default is true, returns will conatins a tree of the directory;
}).then(parsed => {
  console.log(fn.pretty(parsed.children));
  // fn.log(parsed.files, '# parsed.files');
});
```

#### 3.3.4 Run dir-children example 
`$ node test.js`
```json
[
  {
    "name": "bin",
    "type": "directory",
    "size": 1591,
    "size_kb": "1.55kb",
    "path": "bin",
    "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp/bin",
    "dir": ".",
    "absDir": "/Users/cntower/code/@cntower/dir-parser/myapp",
    "dirNum": 0,
    "fileNum": 1,
    "children": [
      {
        "name": "www",
        "base": "www",
        "ext": "",
        "type": "file",
        "size": 1591,
        "size_kb": "1.55kb",
        "path": "bin/www",
        "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp/bin/www",
        "dir": "bin",
        "absDir": "/Users/cntower/code/@cntower/dir-parser/myapp/bin"
      }
    ]
  },
  {
    "name": "routes",
    "type": "directory",
    "size": 408,
    "size_kb": "0.4kb",
    "path": "routes",
    "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp/routes",
    "dir": ".",
    "absDir": "/Users/cntower/code/@cntower/dir-parser/myapp",
    "dirNum": 0,
    "fileNum": 2,
    "children": [
      {
        "name": "index.js",
        "base": "index",
        "ext": ".js",
        "type": "file",
        "size": 205,
        "size_kb": "0.2kb",
        "path": "routes/index.js",
        "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp/routes/index.js",
        "dir": "routes",
        "absDir": "/Users/cntower/code/@cntower/dir-parser/myapp/routes"
      },
      {
        "name": "users.js",
        "base": "users",
        "ext": ".js",
        "type": "file",
        "size": 203,
        "size_kb": "0.2kb",
        "path": "routes/users.js",
        "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp/routes/users.js",
        "dir": "routes",
        "absDir": "/Users/cntower/code/@cntower/dir-parser/myapp/routes"
      }
    ]
  },
  {
    "name": "app.js",
    "base": "app",
    "ext": ".js",
    "type": "file",
    "size": 1075,
    "size_kb": "1.05kb",
    "path": "app.js",
    "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp/app.js",
    "dir": "",
    "absDir": "/Users/cntower/code/@cntower/dir-parser/myapp"
  },
  {
    "name": "dir-info.txt",
    "base": "dir-info",
    "ext": ".txt",
    "type": "file",
    "size": 277,
    "size_kb": "0.27kb",
    "path": "dir-info.txt",
    "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp/dir-info.txt",
    "dir": "",
    "absDir": "/Users/cntower/code/@cntower/dir-parser/myapp"
  },
  {
    "name": "info.txt",
    "base": "info",
    "ext": ".txt",
    "type": "file",
    "size": 301,
    "size_kb": "0.29kb",
    "path": "info.txt",
    "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp/info.txt",
    "dir": "",
    "absDir": "/Users/cntower/code/@cntower/dir-parser/myapp"
  },
  {
    "name": "package-lock.json",
    "base": "package-lock",
    "ext": ".json",
    "type": "file",
    "size": 68550,
    "size_kb": "66.94kb",
    "path": "package-lock.json",
    "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp/package-lock.json",
    "dir": "",
    "absDir": "/Users/cntower/code/@cntower/dir-parser/myapp"
  },
  {
    "name": "package.json",
    "base": "package",
    "ext": ".json",
    "type": "file",
    "size": 347,
    "size_kb": "0.34kb",
    "path": "package.json",
    "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp/package.json",
    "dir": "",
    "absDir": "/Users/cntower/code/@cntower/dir-parser/myapp"
  },
  {
    "name": "parser.conf.json",
    "base": "parser.conf",
    "ext": ".json",
    "type": "file",
    "size": 145,
    "size_kb": "0.14kb",
    "path": "parser.conf.json",
    "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp/parser.conf.json",
    "dir": "",
    "absDir": "/Users/cntower/code/@cntower/dir-parser/myapp"
  },
  {
    "name": "test.js",
    "base": "test",
    "ext": ".js",
    "type": "file",
    "size": 554,
    "size_kb": "0.54kb",
    "path": "test.js",
    "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp/test.js",
    "dir": "",
    "absDir": "/Users/cntower/code/@cntower/dir-parser/myapp"
  }
]
```

#### 3.3.5 Make dir-files example 
`$ vi test.js`
```js
parser('./', {
  excludes: ['.git', 'node_modules', 'public'],
  getFiles: true,
  getChildren: true,
  dirTree: false
}).then(parsed => {
  // fn.log(parsed.children, '# parsed.children');
  console.log(fn.pretty(parsed.files));
});
```

#### 3.3.6 Run dir-files example 
`$ node test.js`
```json
[
  {
    "name": "www",
    "base": "www",
    "ext": "",
    "type": "file",
    "size": 1591,
    "size_kb": "1.55kb",
    "path": "bin/www",
    "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp/bin/www",
    "dir": "bin",
    "absDir": "/Users/cntower/code/@cntower/dir-parser/myapp/bin"
  },
  {
    "name": "index.js",
    "base": "index",
    "ext": ".js",
    "type": "file",
    "size": 205,
    "size_kb": "0.2kb",
    "path": "routes/index.js",
    "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp/routes/index.js",
    "dir": "routes",
    "absDir": "/Users/cntower/code/@cntower/dir-parser/myapp/routes"
  },
  {
    "name": "users.js",
    "base": "users",
    "ext": ".js",
    "type": "file",
    "size": 203,
    "size_kb": "0.2kb",
    "path": "routes/users.js",
    "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp/routes/users.js",
    "dir": "routes",
    "absDir": "/Users/cntower/code/@cntower/dir-parser/myapp/routes"
  },
  {
    "name": "error.jade",
    "base": "error",
    "ext": ".jade",
    "type": "file",
    "size": 84,
    "size_kb": "0.08kb",
    "path": "views/error.jade",
    "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp/views/error.jade",
    "dir": "views",
    "absDir": "/Users/cntower/code/@cntower/dir-parser/myapp/views"
  },
  {
    "name": "index.jade",
    "base": "index",
    "ext": ".jade",
    "type": "file",
    "size": 66,
    "size_kb": "0.06kb",
    "path": "views/index.jade",
    "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp/views/index.jade",
    "dir": "views",
    "absDir": "/Users/cntower/code/@cntower/dir-parser/myapp/views"
  },
  {
    "name": "layout.jade",
    "base": "layout",
    "ext": ".jade",
    "type": "file",
    "size": 125,
    "size_kb": "0.12kb",
    "path": "views/layout.jade",
    "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp/views/layout.jade",
    "dir": "views",
    "absDir": "/Users/cntower/code/@cntower/dir-parser/myapp/views"
  },
  {
    "name": "app.js",
    "base": "app",
    "ext": ".js",
    "type": "file",
    "size": 1075,
    "size_kb": "1.05kb",
    "path": "app.js",
    "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp/app.js",
    "dir": "",
    "absDir": "/Users/cntower/code/@cntower/dir-parser/myapp"
  },
  {
    "name": "dir-info.txt",
    "base": "dir-info",
    "ext": ".txt",
    "type": "file",
    "size": 277,
    "size_kb": "0.27kb",
    "path": "dir-info.txt",
    "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp/dir-info.txt",
    "dir": "",
    "absDir": "/Users/cntower/code/@cntower/dir-parser/myapp"
  },
  {
    "name": "info.txt",
    "base": "info",
    "ext": ".txt",
    "type": "file",
    "size": 301,
    "size_kb": "0.29kb",
    "path": "info.txt",
    "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp/info.txt",
    "dir": "",
    "absDir": "/Users/cntower/code/@cntower/dir-parser/myapp"
  },
  {
    "name": "package-lock.json",
    "base": "package-lock",
    "ext": ".json",
    "type": "file",
    "size": 68550,
    "size_kb": "66.94kb",
    "path": "package-lock.json",
    "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp/package-lock.json",
    "dir": "",
    "absDir": "/Users/cntower/code/@cntower/dir-parser/myapp"
  },
  {
    "name": "package.json",
    "base": "package",
    "ext": ".json",
    "type": "file",
    "size": 347,
    "size_kb": "0.34kb",
    "path": "package.json",
    "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp/package.json",
    "dir": "",
    "absDir": "/Users/cntower/code/@cntower/dir-parser/myapp"
  },
  {
    "name": "parser.conf.json",
    "base": "parser.conf",
    "ext": ".json",
    "type": "file",
    "size": 145,
    "size_kb": "0.14kb",
    "path": "parser.conf.json",
    "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp/parser.conf.json",
    "dir": "",
    "absDir": "/Users/cntower/code/@cntower/dir-parser/myapp"
  },
  {
    "name": "test.js",
    "base": "test",
    "ext": ".js",
    "type": "file",
    "size": 303,
    "size_kb": "0.3kb",
    "path": "test.js",
    "absPath": "/Users/cntower/code/@cntower/dir-parser/myapp/test.js",
    "dir": "",
    "absDir": "/Users/cntower/code/@cntower/dir-parser/myapp"
  }
]
```
