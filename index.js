const fs=require('fs');
const path=require('path');

const exclude = [];

loadTree(__dirname);

function loadTree(target, deep = 1, prev = ''){
  let split = '';
  let dirinfo = fs.readdirSync(target);
  let dirs=[];
  let files=[];

  // 遍历目录，并将文件夹和文件分开存储
  for (let i = 0; i < dirinfo.length; i++) {
    if (!exclude.includes(dirinfo[i])) {
      let state= fs.statSync(path.join(target, dirinfo[i]));
      if (state.isDirectory()) {
        dirs.push(dirinfo[i]);
      } else if (state.isFile) {
        files.push(dirinfo[i]);
      }
    }
  }
 
  // 文件夹
  for (let i = 0; i < dirs.length; i++) {
    if (i === dirs.length -1 && files.length === 0) {
      console.log(`${prev} └─ ${dirs[i]}`);
      split = '  ';
    } else {
      console.log(`${prev} ├─ ${dirs[i]}`);
      split = ' │';
    }
    let nextPath=path.join(target,dirs[i]);
    let nextdeep=deep+1;
    loadTree(nextPath, nextdeep, prev + split);  
  }

  // 文件
  for (let i = files.length - 1 ; i >= 0; i--) {
     if (i===0) {
       console.log(`${prev} └─  ${files[i]}`);
     } else{
       console.log(`${prev} ├─  ${files[i]}`);
     }
  }
}