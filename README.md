# Dir Parser

Parse a directory and generate it's structure tree.

## Quick Start

### Demo Image

![Dir Parser Demo](dir-parser.png)

### Install dir-parser

> $ npm install dir-parser -g

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

  let target = './';
  let excludes = [ '.git', 'dir-info.txt', 'package-lock.json' ];

  /**
   * Get parsed dir-tree
   * ============================================================
   */
  parse(target, {
    excludes: excludes,
    // dirTree: false,    // Default is true, parsed conatins a string of directory structure truee;
    // members: true      // Default is false, If true, parsed will conatins an object of all members's info;
    // files: true,       // Default is false, If true, parsed will conatins an array of all subfiles's info;
  }).then(parsed => {
    fn.log(parsed.dirTree, '# parsed.dirTree');
    fn.log(fn.pick(parsed, prop => prop !== 'dirTree'), '# parsed result info');
    // fn.log(parsed.members, '# parsed.members');
    // fn.log(parsed.files, '# parsed.files');
  });

  /**
   * Get parsed dir-info (members & files)
   * ============================================================
   */
  excludes = ['.git', 'node_modules', 'dir-info.txt', 'package-lock.json'];
  parsed = parse(target, {
    excludes: excludes,
    dirTree: false,
    files: true,
    members: true
  }).then(parsed => {
    fn.log(parsed.members, '# parsed.members');
    fn.log(parsed.files, '# parsed.files');
  });
```
> $ node test.js
```
==================================================================
                  [08:48:52] # parsed.dirTree
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
                [08:48:52] # parsed result info
------------------------------------------------------------------
{
  "name": "dir-parser",
  "type": "directory",
  "path": "./",
  "absPath": "E:\\Code\\dir-parser",
  "dir": ".",
  "absDir": "E:\\Code",
  "dirNum": 8,
  "fileNum": 29
}
==================================================================


==================================================================
                  [08:48:52] # parsed.members
------------------------------------------------------------------
[
  {
    "name": "bin",
    "type": "directory",
    "size": 2760,
    "size_kb": "2.7kb",
    "path": "bin",
    "absPath": "E:\\Code\\dir-parser\\bin",
    "dir": ".",
    "absDir": "E:\\Code\\dir-parser",
    "dirNum": 0,
    "fileNum": 1,
    "members": [
      {
        "name": "parser.js",
        "base": "parser",
        "ext": ".js",
        "type": "file",
        "size": 2760,
        "size_kb": "2.7kb",
        "path": "bin\\parser.js",
        "absPath": "E:\\Code\\dir-parser\\bin\\parser.js",
        "dir": "bin",
        "absDir": "E:\\Code\\dir-parser\\bin"
      }
    ]
  },
  {
    "name": "src",
    "type": "directory",
    "size": 5465,
    "size_kb": "5.34kb",
    "path": "src",
    "absPath": "E:\\Code\\dir-parser\\src",
    "dir": ".",
    "absDir": "E:\\Code\\dir-parser",
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
        "absPath": "E:\\Code\\dir-parser\\src\\base.js",
        "dir": "src",
        "absDir": "E:\\Code\\dir-parser\\src"
      },
      {
        "name": "dir-parser.js",
        "base": "dir-parser",
        "ext": ".js",
        "type": "file",
        "size": 4428,
        "size_kb": "4.32kb",
        "path": "src\\dir-parser.js",
        "absPath": "E:\\Code\\dir-parser\\src\\dir-parser.js",
        "dir": "src",
        "absDir": "E:\\Code\\dir-parser\\src"
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
    "absPath": "E:\\Code\\dir-parser\\.gitignore",
    "dir": "",
    "absDir": "E:\\Code\\dir-parser"
  },
  {
    "name": "dir-parser.png",
    "base": "dir-parser",
    "ext": ".png",
    "type": "file",
    "size": 76470,
    "size_kb": "74.68kb",
    "path": "dir-parser.png",
    "absPath": "E:\\Code\\dir-parser\\dir-parser.png",
    "dir": "",
    "absDir": "E:\\Code\\dir-parser"
  },
  {
    "name": "index.js",
    "base": "index",
    "ext": ".js",
    "type": "file",
    "size": 45,
    "size_kb": "0.04kb",
    "path": "index.js",
    "absPath": "E:\\Code\\dir-parser\\index.js",
    "dir": "",
    "absDir": "E:\\Code\\dir-parser"
  },
  {
    "name": "package.json",
    "base": "package",
    "ext": ".json",
    "type": "file",
    "size": 733,
    "size_kb": "0.72kb",
    "path": "package.json",
    "absPath": "E:\\Code\\dir-parser\\package.json",
    "dir": "",
    "absDir": "E:\\Code\\dir-parser"
  },
  {
    "name": "README.md",
    "base": "README",
    "ext": ".md",
    "type": "file",
    "size": 11276,
    "size_kb": "11.01kb",
    "path": "README.md",
    "absPath": "E:\\Code\\dir-parser\\README.md",
    "dir": "",
    "absDir": "E:\\Code\\dir-parser"
  },
  {
    "name": "test.js",
    "base": "test",
    "ext": ".js",
    "type": "file",
    "size": 1022,
    "size_kb": "1kb",
    "path": "test.js",
    "absPath": "E:\\Code\\dir-parser\\test.js",
    "dir": "",
    "absDir": "E:\\Code\\dir-parser"
  }
]
==================================================================


==================================================================
                   [08:48:52] # parsed.files
------------------------------------------------------------------
[
  {
    "name": "parser.js",
    "base": "parser",
    "ext": ".js",
    "type": "file",
    "size": 2760,
    "size_kb": "2.7kb",
    "path": "bin\\parser.js",
    "absPath": "E:\\Code\\dir-parser\\bin\\parser.js",
    "dir": "bin",
    "absDir": "E:\\Code\\dir-parser\\bin"
  },
  {
    "name": "base.js",
    "base": "base",
    "ext": ".js",
    "type": "file",
    "size": 1037,
    "size_kb": "1.01kb",
    "path": "src\\base.js",
    "absPath": "E:\\Code\\dir-parser\\src\\base.js",
    "dir": "src",
    "absDir": "E:\\Code\\dir-parser\\src"
  },
  {
    "name": "dir-parser.js",
    "base": "dir-parser",
    "ext": ".js",
    "type": "file",
    "size": 4428,
    "size_kb": "4.32kb",
    "path": "src\\dir-parser.js",
    "absPath": "E:\\Code\\dir-parser\\src\\dir-parser.js",
    "dir": "src",
    "absDir": "E:\\Code\\dir-parser\\src"
  },
  {
    "name": ".gitignore",
    "base": ".gitignore",
    "ext": "",
    "type": "file",
    "size": 34,
    "size_kb": "0.03kb",
    "path": ".gitignore",
    "absPath": "E:\\Code\\dir-parser\\.gitignore",
    "dir": "",
    "absDir": "E:\\Code\\dir-parser"
  },
  {
    "name": "dir-parser.png",
    "base": "dir-parser",
    "ext": ".png",
    "type": "file",
    "size": 76470,
    "size_kb": "74.68kb",
    "path": "dir-parser.png",
    "absPath": "E:\\Code\\dir-parser\\dir-parser.png",
    "dir": "",
    "absDir": "E:\\Code\\dir-parser"
  },
  {
    "name": "index.js",
    "base": "index",
    "ext": ".js",
    "type": "file",
    "size": 45,
    "size_kb": "0.04kb",
    "path": "index.js",
    "absPath": "E:\\Code\\dir-parser\\index.js",
    "dir": "",
    "absDir": "E:\\Code\\dir-parser"
  },
  {
    "name": "package.json",
    "base": "package",
    "ext": ".json",
    "type": "file",
    "size": 733,
    "size_kb": "0.72kb",
    "path": "package.json",
    "absPath": "E:\\Code\\dir-parser\\package.json",
    "dir": "",
    "absDir": "E:\\Code\\dir-parser"
  },
  {
    "name": "README.md",
    "base": "README",
    "ext": ".md",
    "type": "file",
    "size": 11276,
    "size_kb": "11.01kb",
    "path": "README.md",
    "absPath": "E:\\Code\\dir-parser\\README.md",
    "dir": "",
    "absDir": "E:\\Code\\dir-parser"
  },
  {
    "name": "test.js",
    "base": "test",
    "ext": ".js",
    "type": "file",
    "size": 1022,
    "size_kb": "1kb",
    "path": "test.js",
    "absPath": "E:\\Code\\dir-parser\\test.js",
    "dir": "",
    "absDir": "E:\\Code\\dir-parser"
  }
]
==================================================================
```