const fs = require('fs');
const uppercamelcase = require('uppercamelcase'); // 引入驼峰命名函数

const componentsConf = require('../../components.json'); // 引入 components.json
const componentName = uppercamelcase(process.argv[2]); // 新建组件名

console.log(componentName, componentsConf);

// 1.先检测是否传入了组件名参数
if (!process.argv[2]) {
  console.error('请输入组件名 - 驼峰式命名');
  return;
}

// 2.判断是否已经存在此组件
if (componentsConf[componentName]) {
  console.error('组件名已存在~');
  return;
}

// 3.写入 components.json 配置文件
componentsConf[componentName] = `./packages/${componentName}/index.js`;
console.log(componentsConf);
