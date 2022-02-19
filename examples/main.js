import Vue from 'vue';
import app from './app.vue';
import Element from 'element-ui';
import KCOMPONENTS from '../src/index.js'; // 拉取组件源代码并注入 Vue 中
import 'element-ui/lib/theme-chalk/index.css'; // 引入 elementUi 需要引入它的样式文件
import '../src/styles/index.scss';

Vue.use(Element); // 因为很多组件是基于 elementUi 的二次封装
Vue.use(KCOMPONENTS);

new Vue({
  render: (h) => h(app),
}).$mount('#app');
