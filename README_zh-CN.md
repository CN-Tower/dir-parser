<h1 align="center">😎 文件夹解析器[Dir Parser v2] 😎</h1>
<p align="center">
  <img width="80%;" src="images/demo.png">
</p>

# 文件夹解析器 dir-parser

[![npm](https://img.shields.io/npm/v/dir-parser.svg)](https://www.npmjs.com/package/dir-parser)
[![LICENSE MIT](https://img.shields.io/npm/l/dir-parser.svg)](https://www.npmjs.com/package/dir-parser) 
[![NPM Downloads](https://img.shields.io/npm/dm/dir-parser.svg?style=flat)](https://npmcharts.com/compare/dir-parser?minimal=true)
[![Install Size](https://packagephobia.now.sh/badge?p=dir-parser)](https://packagephobia.now.sh/result?p=dir-parser)

> 解析一个文件夹并生成它的结构树

使用其它语言阅读: [English](https://github.com/CN-Tower/dir-parser) | 简体中文

- [文件夹解析器 dir-parser](#文件夹解析器-dir-parser)
  - [一、什么是文件夹解析器 dir-parser](#一什么是文件夹解析器-dir-parser)
    - [1.1 工具简介](#11-工具简介)
    - [1.2 安装使用](#12-安装使用)
  - [二、在命令行中使用](#二在命令行中使用)
    - [2.1 打印帮助信息](#21-打印帮助信息)
    - [2.2 生成文件树](#22-生成文件树)
    - [2.3 使用解析参数](#23-使用解析参数)
      - [2.3.1 排除项-excludes](#231-排除项-excludes)
      - [2.3.2 忽略项-ignores](#232-忽略项-ignores)
      - [2.3.3 Glob过滤-glob](#233-Glob过滤-glob)
      - [2.3.4 正则匹配-patterns](#234-正则匹配-patterns)
      - [2.3.5 结构线型-lineType](#235-结构线型-lineType)
      - [2.3.6 解析深度-depth](#236-解析深度-depth)
      - [2.3.7 节点逆序-reverse](#237-节点逆序-reverse)
      - [2.3.8 文件优先-fileFirst](#238-文件优先-fileFirst)
      - [2.3.9 仅文件-fileOnly](#239-仅文件-fileOnly)
      - [2.3.10 仅文件夹-dirOnly](#2310-仅文件夹-dirOnly)
      - [2.3.11 解析信息-dirInfo](#2311-解析信息-dirInfo)
      - [2.3.12 路径排除-excPaths](#2312-路径排除-excPaths)
      - [2.3.13 正则排除-excPatterns](#2313-正则排除-excPatterns)
      - [2.3.14 静默解析-silent](#2314-静默解析-silent)
      - [2.3.15 生成结果-generate](#2315-生成结果-generate)
      - [2.3.16 配置文件-config](#2316-配置文件-config)
    - [2.4 多个命令混合使用](#24-多个命令混合使用)
  - [三、在Js代码中使用](#三在Js代码中使用)
    - [3.1 方法接口](#31-方法接口)
      - [3.1.1 主函数-parser](#311-主函数-parser)
      - [3.1.2 参数选项-Options](#312-参数选项-options)
      - [3.1.3 解析结果-Parsed](#313-解析结果-parsed)
      - [3.1.4 文件夹信息-DirInfo](#314-文件夹信息-dirinfo)
      - [3.1.5 文件信息-FileInfo](#315-文件信息-fileinfo)
    - [3.2 获取文件树](#32-获取文件树)
      - [3.2.1 构建文件树案例](#321-构建文件树案例)
      - [3.2.2 执行文件树案例](#322-执行文件树案例)
    - [3.3 获取文件信息](#33-获取文件信息)
      - [3.3.1 构建文件夹信息案例](#331-构建文件夹信息案例)
      - [3.3.2 执行文件夹信息案例](#332-执行文件夹信息案例)
      - [3.3.3 构建子文件信息案例](#333-构建子文件信息案例)
      - [3.3.4 执行子文件信息案例](#334-执行子文件信息案例)
      - [3.3.5 构建纯文件信息案例](#335-构建纯文件信息案例)
      - [3.3.6 执行纯文件信息案例](#336-执行纯文件信息案例)

## 一、什么是文件夹解析器 dir-parser

### 1.1 工具简介
👍👍👍dir-parser是一个基于nodejs的强大的文件夹分析工具，可以在命令行中使用也可以在javascript代码中应用。有很多实用的参数可以设置，可以帮助你获取格式化的文件夹树和内部信息。

### 1.2 安装使用

#### 1.2.1 全局安装
- yarn: `$ yarn global add dir-parser`
- npm: `$ npm install -g dir-parser`

#### 1.2.2 局部安装
- yarn: `$ yarn add dir-parser` or `$ yarn add dir-parser -D`
- npm: `$ npm install dir-parser` or `$ npm install dir-parser -D`

## 二、在命令行中使用

### 2.1 打印帮助信息
`$ parser -H` (或: `$ parser --Help`)
```
用例: parser [参数options]

参数 Options:
  -V, --version                   打印输出版本号。
  -v, --version                   打印输出版本号。
  -c, --config [config]           根据配置文件解析，可选。
  -i, --input <input>             指定个目标文件夹，(默认: "./")。
  -o, --output <output>           解析结果输出目录，(默认: "./")。
  -d, --depth <depth>             解析深度，0表示不限制。(默认: 0)。
  -l, --lineType <lineType>       生成的文件树线型, "dash" 或 "solid"，(默认: "solid")。
  -e, --excludes <excludes..>     根据名称排除文件夹或文件。
  -x, --excPaths <excPaths..>     根据路径排除文件夹或文件。
  -p, --patterns <patterns...>    根据正则解析文件夹或文件。
  -g, --generate [fileName]       生成一个解析结果的文件，默认文件名为"dir-info.txt"。
  -r, --reverse                   生成节点逆序的文件树。
  -s, --silent                    静默解析，不在控制台输出解析结果。
  -f, --fileFirst                 先输出文件节点，先于文件夹节点。
  -F, --fileOnly                  只解析文件。
  -D, --dirOnly                   只解析文件夹，只有当fileOnly为false时才生效。
  -I, --ignores <ignores..>       根据名称忽略一些文件夹或文件。
  -N, --no-dirInfo                不在解析结果中显示文件夹和文件的数量信息。
  -G, --glob <glob>               使用glob语法过虑文件.
  --paths <paths..>               根据路径解析文件夹或文件。
  --includes <includes..>         根据名称解析文件夹或文件。
  --excPatterns <excPatterns...>  根据正则排队文件夹或文件。
  -H, --Help                      打印中文帮助信息。
  -h, --help                      打印英语帮助信息。(output usage information)
```

### 2.2 生成文件树
如果需要跑例子的话，你可能需要安装 `express-generator`，但这也不是必需的:<br>
运行: <br>
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

### 2.3 使用解析参数

#### 2.3.1 排除项-excludes
👉 根据名称排除文件夹或文件。<br>
`$ # git init`<br>
`$ npm install`<br>
`$ parser -e .git,node_modules,public`<br>
或: `$ parser --excludes .git,node_modules,public`
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
文件或文件名称中包含空格：<br>
`$ touch 'white space.txt'`<br>
`$ parser -e '[".git", "node_modules", "public", "white space.txt"]'`
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

#### 2.3.2 忽略项-ignores
👉 根据名称忽略一些文件夹或文件。<br>
`$ parser -e node_modules -I bin,public`<br>
或: `$ parser -e node_modules --ignores bin,public`
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

#### 2.3.3 Glob过滤-glob
👉 使用glob规则过滤，注意：glob规则必需要有引号！<br>
`$ parser -e node_modules -G '**/*.js'`<br>
或: `$ parser -e node_modules --glob '**/*.js'`
```
myapp ( Directories: 1, Files: 3 )
├── routes
│   ├── index.js
│   └── users.js
└── app.js
```

#### 2.3.4 正则匹配-patterns
👉 根据正则解析文件夹或文件。<br>
`$ parser -e node_modules -p .js$`<br>
或: `$ parser -e node_modules --patterns .js$`
```
myapp ( Directories: 1, Files: 3 )
├── routes
│   ├── index.js
│   └── users.js
└── app.js
```

#### 2.3.5 结构线型-lineType
👉 生成的文件树线型, "dash" 或 "solid"，(默认: "solid")。<br>
`$ parser -e bin,node_modules -l dash`<br>
或: `$ parser -e bin,node_modules --lineType dash`
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

#### 2.3.6 解析深度-depth
👉 解析深度，0表示不限制。(默认: 0)<br>
`$ parser -e node_modules,views -d 2`<br>
或: `$ parser -e node_modules,views --depth 2`
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

#### 2.3.7 节点逆序-reverse
👉 生成节点逆序的文件树。<br>
`$ parser -e node_modules,views -d 2 -r`<br>
或: `$ parser -e node_modules,views -d 2 --reverse`
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

#### 2.3.8 文件优先-fileFirst
👉 先输出文件节点，先于文件夹节点。<br>
`$ parser -e node_modules,bin,views -f`<br>
或: `$ parser -e node_modules,bin,views --fileFirst`
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

#### 2.3.9 仅文件-fileOnly
👉 只解析文件。<br>
`$ parser -e node_modules,bin,views -F`<br>
或: `$ parser -e node_modules,bin,views --fileOnly`
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

#### 2.3.10 仅文件夹-dirOnly
👉 只解析文件夹，只有当fileOnly为false时才生效。<br>
`$ parser -e node_modules,bin,views -D`<br>
或: `$ parser -e node_modules,bin,views --dirOnly`
```
myapp ( Directories: 5 )
├── public
│   ├── images/
│   ├── javascripts/
│   └── stylesheets/
└── routes/
```

#### 2.3.11 解析信息-dirInfo
👉 不在解析结果中显示文件夹和文件的数量信息。<br>
`$ parser -e node_modules,bin,public -N`<br>
或: `$ parser -e node_modules,bin,public --no-dirInfo`
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

#### 2.3.12 路径排除-excPaths
👉 根据路径排除文件夹或文件。<br>
`$ parser -e node_modules,bin -x myapp/public`<br>
或: `$ parser -e node_modules,bin -excPath myapp/public`
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

#### 2.3.13 正则排除-excPatterns
👉 根据正则排队文件夹或文件。<br>
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

#### 2.3.14 静默解析-silent
👉 静默解析，不在控制台输出解析结果。<br>
`$ parser -e node_modules,bin,public -s`<br>
或: `$ parser -e node_modules,bin,public --silent`

#### 2.3.15 生成结果-generate
👉 生成一个解析结果的文件，默认文件名为"dir-info.txt"。<br>
`$ parser -e node_modules,bin,public -sg`<br>
或: `$ parser -e node_modules,bin,public -s --generate`<br>
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

#### 2.3.16 配置文件-config
👉 根据配置文件解析，可选。<br>
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

### 2.4 多个命令混合使用
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

## 三、在Js代码中使用

### 3.1 方法接口

#### 3.1.1 主函数-parser
```ts
parser(dirPath: string, options: Options): Promise<Parsed>
```

#### 3.1.2 参数选项-Options
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
}
```
#### 3.1.3 解析结果-Parsed
```ts
interface Parsed extends DirInfo {
  dirTree: string;
  children: Array<DirInfo | FileInfo>
  files: Array<FileInfo>
}
```

#### 3.1.4 文件夹信息-DirInfo
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

#### 3.1.5 文件信息-FileInfo
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

### 3.2 获取文件树

#### 3.2.1 构建文件树案例
`$ npm install funclib`<br>
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

#### 3.2.2 执行文件树案例
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

### 3.3 获取文件信息

#### 3.3.1 构建文件夹信息案例
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
#### 3.3.2 执行文件夹信息案例
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

#### 3.3.3 构建子文件信息案例
`$ vi test.js`
```js
parser('./', {
  excludes: ['.git', 'node_modules', 'public'],
  getFiles: true,    // 默认为false，返回结果是否包含一个包含所有子文件信息的数组。
  getChildren: true, // 默认为false，返回结果是否包含一个所有子文件夹和子文件信息的数组。
  dirTree: false     // 默认为true，返回结果是否包含生成的文件树信息
}).then(parsed => {
  console.log(fn.pretty(parsed.children));
  // fn.log(parsed.files, '# parsed.files');
});
```

#### 3.3.4 执行子文件信息案例
`$ node test.js`
```json
、
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

#### 3.3.5 构建纯文件信息案例
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

#### 3.3.6 执行纯文件信息案例
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
