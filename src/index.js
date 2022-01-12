import VirtualList from './components/VirtualList/VirtualList.vue';
import SelectTree from './components/SelectTree/SelectTree.vue';

// 注册组件
VirtualList.install = (Vue) => Vue.component(VirtualList.name, VirtualList); // 虚拟列表组件
SelectTree.install = (Vue) => Vue.component(VirtualList.name, VirtualList); // 树形下拉框组件

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  VirtualList,
  SelectTree,
};
