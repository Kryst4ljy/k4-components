import SelectTree from './src/main.vue';

/* istanbul ignore next */
SelectTree.install = function (Vue) {
  Vue.component(SelectTree.name, SelectTree);
};

export default SelectTree;
