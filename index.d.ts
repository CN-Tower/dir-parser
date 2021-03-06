export = parser;
export as namespace parser;

declare var parser: parser.Parser;

declare namespace parser {
  interface Parser {
    /**
     * parser() main method
     * @param dirPath { string }
     * @param ptions { Options }
     */
    (dirPath: string, ptions: Options): Promise<Parsed>
  }

  /**
   * options of dirparse 
   */
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
    lineType?: 'solid' | 'dashed'; // default: 'solid'
    excludes?: Array<string>;      // eg: [ '.git', 'node_modules', '.idea' ];
    excPaths?: Array<string>;      // eg: [ 'src/app' ];
    excPatterns?: Array<string>;   // eg: [ 'src/*.js ]';
    ignores: Array<string>;        // eg: [ 'public' ];
    includes: Array<string>;       // eg: [ 'app.js' ];
    paths?: Array<string>;         // eg: [ 'src/public' ];
    patterns?: Array<string>;      // eg: [ '*.js ]';
  }

  /**
   * the pased result.
   */
  interface Parsed extends DirInfo {
    dirTree: string;
    children: Array<DirInfo | FileInfo>
    files: Array<FileInfo>
  }


  /**
   * field of directory info.
   */
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

  /**
   * field of file info.
   */
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