import Table from './src/main.vue';

/* istanbul ignore next */
Table.install = function (Vue) {
  Vue.component(Table.name, Table);
};

export default Table;