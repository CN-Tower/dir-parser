export = parser;
export as namespace parser;

declare var parser: parser.Parser;

declare namespace parser {
  interface Parser {
    (dirPath: string, ptions: Options): Promise<Parsed>
  }

  interface Options {
    output?: string;               // path string
    lineType?: 'solid' | 'dashed';
    excludes?: Array<string>;      // eg: [ '.git', 'node_modules', '.idea' ];
    excPaths?: Array<string>;      // eg: [ 'src/app' ];
    patterns?: Array<string>;      // eg: [ 'src/*.js ]';
    filesFirst?: boolean;
    noNum?: boolean;
    files?: boolean;
    children?: boolean;
    dirTree?: boolean;
  }

  interface Parsed extends DirInfo {
    dirTree: string;
    children: Array<DirInfo|FileInfo>
    files: Array<FileInfo>
  }

  interface DirInfo {
    name: string = name;
    type: 'directory';
    size: number;
    size_kb: number;
    path: string;
    absPath: string;
    dir: string;
    absDir: string;
    dirNum: number;
    fileNum: number;
    children: Array<DirInfo|FileInfo>
  }

  interface FileInfo {
    name: string = name;
    base: string = infos.name;
    ext: string = infos.ext;
    type: 'file';
    size: number;
    size_kb: number;
    path: string;
    absPath: string;
    dir: string;
    absDir: string;
  }
}