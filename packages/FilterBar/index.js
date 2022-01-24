import FilterBar from './src/main.vue';

/* istanbul ignore next */
FilterBar.install = function (Vue) {
  Vue.component(FilterBar.name, FilterBar);
};

export default FilterBar;
