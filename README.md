# Dir Parser

Parse a directory and generate it's structure tree.

## Quick Start

### Demo Image
![Dir Parser Demo](dir-parser.png)

### Install dir-parser
```
$ npm install dir-parser -g
```
### Get help
```
$ parse -h
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
```
$ cd your/demo/app
$ parse  # Terminal log:

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
```
$ parse -e bin,public -n -s
$ cat dir-info.txt

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
```
# Usage 01
#Hint: There should no white space in the excludes series!
$ parse -e .git,node_modules -x bin/www

# Usage 01
#Hint: There should no white space in the excludes Array!
$ parse -e ['.git','node_modules']  -x ['bin/www'] 

# Usage 03
# Parse by a config file, In parser.json:

{
  "directory": "your/demo/app",
  "output": "your/output/dir",
  "excludes": [
    ".git",
    "node_modules"
  ]
}

$ parse -c ./parser.json
```
### In javaScript code
```
$ npm install dir-parse funclib

$ vi test.js
  const parse = require('dir-parse');
  const fn = require('funclib');

  const target = './';
  const excludes = [ '.git', 'node_modules' ];

  const parsed = parse(target, { 'excludes': excludes });
  const parsedInfo = fn.pick(parsed, [ 'dirName', 'dirNum', 'fileNum' ]);

  fn.log(parsedInfo, '# Parsed Info', { isShowTime: false });
  fn.log(parsed.dirTree, '# Parsed Dir Tree', { isShowTime: false });

$ node test.js

==================================================================
                         # Parsed Info
------------------------------------------------------------------
{
  "dirName": "dir-parser",
  "dirNum": 7,
  "fileNum": 29
}
==================================================================

==================================================================
                       # Parsed Dir Tree
------------------------------------------------------------------
dir-parser ( Directorys: 7, Files: 29 )
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