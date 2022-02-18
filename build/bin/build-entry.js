const path = require('path');
const render = require('json-templater/string');
const componentsConf = require('../../components.json'); // 组件列表
const { fileSave } = require('../../src/utils/file');
const endOfLine = require('os').EOL; // 行尾符

const outPath = path.join(__dirname, '../../src/index.js'); // 输出路径
const importTemp = "import {{name}} from '../packages/{{name}}/index.js';";
const componentsTemp = '  {{name}}';
const mainTemp = `{{include}}

const components = [
{{components}}
];

const install = (Vue) => {
  // 注册组件
  components.forEach((component) => {
    Vue.component(component.name, component);
  });

  // 这里可以操作Vue
  // Vue.prototype.$message = Message;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
{{components}}
};`;

// 遍历组件列表
const importArr = [];
const componentArr = [];
for (let key in componentsConf) {
  importArr.push(render(importTemp, { name: key }));
  componentArr.push(render(componentsTemp, { name: key }));
}

fileSave(
  outPath,
  render(mainTemp, {
    include: importArr.join(endOfLine),
    components: componentArr.join(',' + endOfLine),
  }),
);

console.log('Temp Done!');
