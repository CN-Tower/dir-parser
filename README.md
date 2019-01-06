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

> $ cd your/demo/app

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

> $ parse -e bin,public -n -s

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
  "excludes": [
    ".git",
    "node_modules"
  ]
}
```
> $ parse -c ./parser.conf.json

### In javaScript code

> $ npm install dir-parse funclib

> $ vi test.js
```
  const fn = require('funclib');
  const parse = require('./index');

  const target = './';
  const excludes = ['.git'];

  const parsed = parse(target, {
    excludes: excludes,
    // dirTree: false,    // Default is true, returns will conatins a string of directory structure truee;
    // files: true,       // Default is false, If true, parsed will conatins an array of all subfiles's info;
    // members: true      // Default is false, If true, parsed will conatins an object of all members's info;
  });

  const BaseInfo = fn.pick(parsed, prop => !['members', 'files', 'dirTree'].includes(prop));

  fn.log(BaseInfo, '# Parsed Info');
  fn.log(parsed.dirTree, '# Parsed Dir Tree');
  // fn.log(parsed.files, '# Parsed Dir Files');
  // fn.log(parsed.members, '# Parsed Dir Members');
```
> $ node test.js
```
==================================================================
                    [22:10:07] # Parsed Info
------------------------------------------------------------------
{
  "name": "dir-parser",
  "type": "directory",
  "path": "./",
  "absPath": "E:\\Code\\dir-parser",
  "dir": ".",
  "absDir": "E:\\Code",
  "dirNum": 8,
  "fileNum": 31
}
==================================================================


==================================================================
                  [22:10:07] # Parsed Dir Tree
------------------------------------------------------------------
dir-parser ( Directorys: 8, Files: 31 )
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
 ├─ dir-info.txt
 ├─ dir-parser.png
 ├─ index.js
 ├─ package-lock.json
 ├─ package.json
 ├─ README.md
 └─ test.js
==================================================================
```