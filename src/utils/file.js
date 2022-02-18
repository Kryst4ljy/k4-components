const fs = require('fs');
const path = require('path');

/**
 * @name fileSave
 * @description 文件写入方法：有则覆盖写入，没有则新建后写入
 * @param {String} url 文件路径
 * @param {String} content 保存的字符
 */
const fileSave = async (url, content) => {
  // 1.先打开文件
  const openPromise = new Promise((res, rej) => {
    fs.open(url, 'wx', (err, fd) => {
      // 文件存在 - 覆盖改写
      if (err && err.code === 'EEXIST') {
        res(true);
        return;
      }
      // 文件不存在 - 新增
      res(false);
    });
  });

  const openRes = await openPromise.then();
  if (openRes) {
    // 2.覆盖改写
    fs.writeFile(url, content, 'utf-8', (err) => {
      if (err) throw err;
    });
  } else {
    // 3.新增
    fs.mkdir(path.dirname(url), { recursive: true }, (err) => {
      if (err) throw err;
      fs.writeFile(url, content, 'utf-8', (err) => {
        if (err) throw err;
      });
    });
  }
};

module.exports = { fileSave };
