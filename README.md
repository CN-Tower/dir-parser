# Dir Parser

Parse a directory and generate it's structure tree.

## Quick Start

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
  -e, --excludes [excludes]    Exclude some directories or files
  -c, --config [config]        Parser config file
  -s, --silent                 Not print the parse-result in terminal
  -n, --noNum                  Don't show file and directory number
  -h, --help                   output usage information
```
### Parse your dir
```
$ cd your/demo/dir
$ parse
# It will generate a text file: 'dir-info.txt';
# in terminal log:
dir
 ├─ subdir
 │ └─ file1.txt
 ├─ subdir2
 │ ├─ dem1
 │ │ └─ test1.txt
 │ └─ dem2
 └─ README.md
```
### With params
```
$ parse -e test1 -s
$ cat dir-info.txt
dir
 ├─ subdir2
 │ ├─ dem1
 │ │ └─ test1.txt
 │ └─ dem2
 └─ README.md
```
### Recommend usage
```
$ parse -e ['.git', 'node_modules']

#or width a config file
# >> parser.json
{
  "directory": "your/demo/dir",
  "output": "your/output/dir",
  "excludes": [
    ".git",
    "node_modules"
  ]
}

$ parse -c ./parser.json
```