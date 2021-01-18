import virtualList from "./virtualList/virtualList.vue";

virtualList.install = (Vue) => Vue.component(virtualList.name, virtualList); // 注册组件

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default virtualList;
