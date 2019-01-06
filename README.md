# Dir Parser

Parse a directory and generate it's structure tree.

## Quick Start

### Demo Image

![Dir Parser Demo](dir-parser.png)

### Install dir-parser

> $ npm install dir-parser

### Get help

> $ parse -h
```
Usage: index [options]
Options:
  -V, --version                output the version number
  -v, --version
  -d, --directory [directory]  The target directory, default: "./"
  -o, --output [output]        Parse result output path, default: "./"
  -e, --excludes [excludes]    Exclude some directories or files by name
  -x, --exdPaths [exdPaths]    Exclude some directories or files by path
  -c, --config [config]        Parser config file
  -s, --silent                 Don't print the parse-result in terminal
  -n, --noNum                  Don't show file and directory number
  -h, --help                   output usage information
```

### Parse your dir

> $ cd your/demo/app<br>
> $ parse
```
app ( Directorys: 7, Files: 9 )
 ├─ bin
 │ └─ www
 ├─ public
 │ ├─ images
 │ ├─ javascripts
 │ └─ stylesheets
 │   └─ style.css
 ├─ routes
 │ ├─ index.js
 │ └─ users.js
 ├─ views
 │ ├─ error.jade
 │ ├─ index.jade
 │ └─ layout.jade
 ├─ app.js
 └─ package.json
```
### Parse your dir with params

> $ parse -e bin,public -n -s<br>
> $ cat dir-info.txt
```
app
 ├─ routes
 │ ├─ index.js
 │ └─ users.js
 ├─ views
 │ ├─ error.jade
 │ ├─ index.jade
 │ └─ layout.jade
 ├─ app.js
 └─ package.json
```

### Recommend usages

Usage 01
*There should no white space in the excludes series!*
> $ parse -e .git,node_modules -x bin/www

Usage 02
*There should no white space in the excludes Array!*
> $ parse -e ['.git','node_modules']  -x ['bin/www']

Usage 03
*Parse by a config file*
> $ vi parser.conf.json
```
{
  "directory": "your/demo/app",
  "output": "your/output/dir",
  "excludes": [ ".git", "node_modules" ]
}
```
> $ parse -c ./parser.conf.json

### In javaScript code

> $ npm install dir-parse funclib<br>
> $ vi test.js
```
  const fn = require('funclib');
  const parse = require('dir-parser');

  const target = './';
  let excludes = [ '.git', 'dir-info.txt', 'package-lock.json' ];

  let parsed = parse(target, {
    excludes: excludes,
    // dirTree: false,    // Default is true, returns will conatins a string of directory structure truee;
    // files: true,       // Default is false, If true, parsed will conatins an array of all subfiles's info;
    // members: true      // Default is false, If true, parsed will conatins an object of all members's info;
  });

  const BaseInfo = fn.pick(parsed, prop => prop !== 'dirTree');

  fn.log(BaseInfo, '# Parsed Basic Info');
  fn.log(parsed.dirTree, '# Parsed Dir Tree');
  // fn.log(parsed.files, '# Parsed Dir Files');
  // fn.log(parsed.members, '# Parsed Dir Members');

  excludes = ['.git', 'node_modules', 'dir-info.txt', 'package-lock.json'];
  parsed = parse(target, {
    excludes: excludes,
    dirTree: false,
    files: true,
    members: true
  });

  fn.log(parsed, '# Parsed Info');
```
> $ node test.js
```
==================================================================
                 [23:39:52] # Parsed Basic Info
------------------------------------------------------------------
{
  "name": "dir-parser",
  "type": "directory",
  "path": "./",
  "absPath": "D:\\Code\\dir-parser",
  "dir": ".",
  "absDir": "D:\\Code",
  "dirNum": 8,
  "fileNum": 29
}
==================================================================


==================================================================
                  [23:39:52] # Parsed Dir Tree
------------------------------------------------------------------
dir-parser ( Directorys: 8, Files: 29 )
 ├─ bin
 │ └─ parser.js
 ├─ node_modules
 │ ├─ commander
 │ │ ├─ typings
 │ │ │ └─ index.d.ts
 │ │ ├─ CHANGELOG.md
 │ │ ├─ index.js
 │ │ ├─ LICENSE
 │ │ ├─ package.json
 │ │ └─ Readme.md
 │ ├─ funclib
 │ │ ├─ funclib.core.js
 │ │ ├─ funclib.js
 │ │ ├─ funclib.min.js
 │ │ ├─ index.d.ts
 │ │ ├─ index.js
 │ │ ├─ package.json
 │ │ └─ README.md
 │ └─ progress
 │   ├─ lib
 │   │ └─ node-progress.js
 │   ├─ CHANGELOG.md
 │   ├─ index.js
 │   ├─ LICENSE
 │   ├─ Makefile
 │   ├─ package.json
 │   └─ Readme.md
 ├─ src
 │ ├─ base.js
 │ └─ dir-parser.js
 ├─ .gitignore
 ├─ dir-parser.png
 ├─ index.js
 ├─ package.json
 ├─ README.md
 └─ test.js
==================================================================


==================================================================
                    [23:39:52] # Parsed Info
------------------------------------------------------------------
{
  "name": "dir-parser",
  "type": "directory",
  "size": 174696,
  "size_kb": "170.6kb",
  "path": "./",
  "absPath": "D:\\Code\\dir-parser",
  "dir": ".",
  "absDir": "D:\\Code",
  "dirNum": 2,
  "fileNum": 6,
  "members": [
    {
      "name": "bin",
      "type": "directory",
      "size": 2761,
      "size_kb": "2.7kb",
      "path": "bin",
      "absPath": "D:\\Code\\dir-parser\\bin",
      "dir": ".",
      "absDir": "D:\\Code\\dir-parser",
      "dirNum": 0,
      "fileNum": 1,
      "members": [
        {
          "name": "parser.js",
          "base": "parser",
          "ext": ".js",
          "type": "file",
          "size": 2761,
          "size_kb": "2.7kb",
          "path": "bin\\parser.js",
          "absPath": "D:\\Code\\dir-parser\\bin\\parser.js",
          "dir": "bin",
          "absDir": "D:\\Code\\dir-parser\\bin"
        }
      ]
    },
    {
      "name": "src",
      "type": "directory",
      "size": 5465,
      "size_kb": "5.34kb",
      "path": "src",
      "absPath": "D:\\Code\\dir-parser\\src",
      "dir": ".",
      "absDir": "D:\\Code\\dir-parser",
      "dirNum": 0,
      "fileNum": 2,
      "members": [
        {
          "name": "base.js",
          "base": "base",
          "ext": ".js",
          "type": "file",
          "size": 1037,
          "size_kb": "1.01kb",
          "path": "src\\base.js",
          "absPath": "D:\\Code\\dir-parser\\src\\base.js",
          "dir": "src",
          "absDir": "D:\\Code\\dir-parser\\src"
        },
        {
          "name": "dir-parser.js",
          "base": "dir-parser",
          "ext": ".js",
          "type": "file",
          "size": 4428,
          "size_kb": "4.32kb",
          "path": "src\\dir-parser.js",
          "absPath": "D:\\Code\\dir-parser\\src\\dir-parser.js",
          "dir": "src",
          "absDir": "D:\\Code\\dir-parser\\src"
        }
      ]
    },
    {
      "name": ".gitignore",
      "base": ".gitignore",
      "ext": "",
      "type": "file",
      "size": 34,
      "size_kb": "0.03kb",
      "path": ".gitignore",
      "absPath": "D:\\Code\\dir-parser\\.gitignore",
      "dir": "",
      "absDir": "D:\\Code\\dir-parser"
    },
    {
      "name": "dir-parser.png",
      "base": "dir-parser",
      "ext": ".png",
      "type": "file",
      "size": 76470,
      "size_kb": "74.68kb",
      "path": "dir-parser.png",
      "absPath": "D:\\Code\\dir-parser\\dir-parser.png",
      "dir": "",
      "absDir": "D:\\Code\\dir-parser"
    },
    {
      "name": "index.js",
      "base": "index",
      "ext": ".js",
      "type": "file",
      "size": 45,
      "size_kb": "0.04kb",
      "path": "index.js",
      "absPath": "D:\\Code\\dir-parser\\index.js",
      "dir": "",
      "absDir": "D:\\Code\\dir-parser"
    },
    {
      "name": "package.json",
      "base": "package",
      "ext": ".json",
      "type": "file",
      "size": 732,
      "size_kb": "0.71kb",
      "path": "package.json",
      "absPath": "D:\\Code\\dir-parser\\package.json",
      "dir": "",
      "absDir": "D:\\Code\\dir-parser"
    },
    {
      "name": "README.md",
      "base": "README",
      "ext": ".md",
      "type": "file",
      "size": 4911,
      "size_kb": "4.8kb",
      "path": "README.md",
      "absPath": "D:\\Code\\dir-parser\\README.md",
      "dir": "",
      "absDir": "D:\\Code\\dir-parser"
    },
    {
      "name": "test.js",
      "base": "test",
      "ext": ".js",
      "type": "file",
      "size": 1043,
      "size_kb": "1.02kb",
      "path": "test.js",
      "absPath": "D:\\Code\\dir-parser\\test.js",
      "dir": "",
      "absDir": "D:\\Code\\dir-parser"
    }
  ],
  "files": [
    {
      "name": "parser.js",
      "base": "parser",
      "ext": ".js",
      "type": "file",
      "size": 2761,
      "size_kb": "2.7kb",
      "path": "bin\\parser.js",
      "absPath": "D:\\Code\\dir-parser\\bin\\parser.js",
      "dir": "bin",
      "absDir": "D:\\Code\\dir-parser\\bin"
    },
    {
      "name": "base.js",
      "base": "base",
      "ext": ".js",
      "type": "file",
      "size": 1037,
      "size_kb": "1.01kb",
      "path": "src\\base.js",
      "absPath": "D:\\Code\\dir-parser\\src\\base.js",
      "dir": "src",
      "absDir": "D:\\Code\\dir-parser\\src"
    },
    {
      "name": "dir-parser.js",
      "base": "dir-parser",
      "ext": ".js",
      "type": "file",
      "size": 4428,
      "size_kb": "4.32kb",
      "path": "src\\dir-parser.js",
      "absPath": "D:\\Code\\dir-parser\\src\\dir-parser.js",
      "dir": "src",
      "absDir": "D:\\Code\\dir-parser\\src"
    },
    {
      "name": ".gitignore",
      "base": ".gitignore",
      "ext": "",
      "type": "file",
      "size": 34,
      "size_kb": "0.03kb",
      "path": ".gitignore",
      "absPath": "D:\\Code\\dir-parser\\.gitignore",
      "dir": "",
      "absDir": "D:\\Code\\dir-parser"
    },
    {
      "name": "dir-parser.png",
      "base": "dir-parser",
      "ext": ".png",
      "type": "file",
      "size": 76470,
      "size_kb": "74.68kb",
      "path": "dir-parser.png",
      "absPath": "D:\\Code\\dir-parser\\dir-parser.png",
      "dir": "",
      "absDir": "D:\\Code\\dir-parser"
    },
    {
      "name": "index.js",
      "base": "index",
      "ext": ".js",
      "type": "file",
      "size": 45,
      "size_kb": "0.04kb",
      "path": "index.js",
      "absPath": "D:\\Code\\dir-parser\\index.js",
      "dir": "",
      "absDir": "D:\\Code\\dir-parser"
    },
    {
      "name": "package.json",
      "base": "package",
      "ext": ".json",
      "type": "file",
      "size": 732,
      "size_kb": "0.71kb",
      "path": "package.json",
      "absPath": "D:\\Code\\dir-parser\\package.json",
      "dir": "",
      "absDir": "D:\\Code\\dir-parser"
    },
    {
      "name": "README.md",
      "base": "README",
      "ext": ".md",
      "type": "file",
      "size": 4911,
      "size_kb": "4.8kb",
      "path": "README.md",
      "absPath": "D:\\Code\\dir-parser\\README.md",
      "dir": "",
      "absDir": "D:\\Code\\dir-parser"
    },
    {
      "name": "test.js",
      "base": "test",
      "ext": ".js",
      "type": "file",
      "size": 1043,
      "size_kb": "1.02kb",
      "path": "test.js",
      "absPath": "D:\\Code\\dir-parser\\test.js",
      "dir": "",
      "absDir": "D:\\Code\\dir-parser"
    }
  ]
}
==================================================================
```