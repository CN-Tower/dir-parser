export = parser;
export as namespace parser;

declare var parser: parser.Parser;

declare namespace parser {
  interface Parser {
    (dirPath: string, ptions: Options): Promise<Parsed>
  }

  interface Options {
    output?: string;
    lineType?: 'solid' | 'dashed';
    depth?: number;
    noNum?: boolean;
    dirOnly?: boolean;
    fileFirst?: boolean;
    files?: boolean;
    children?: boolean;
    dirTree?: boolean;
    excludes?: Array<string>;      // eg: [ '.git', 'node_modules', '.idea' ];
    excPaths?: Array<string>;      // eg: [ 'src/app' ];
    patterns?: Array<string>;      // eg: [ 'src/*.js ]';
  }

  interface Parsed extends DirInfo {
    dirTree: string;
    children: Array<DirInfo | FileInfo>
    files: Array<FileInfo>
  }

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
}