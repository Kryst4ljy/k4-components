<!-- 树状选择器 -->
<template>
  <el-popover ref="popover" placement="top-start" trigger="click">
    <el-input class="select-input" v-model="filterText" placeholder="请输入内容"></el-input>
    <!-- 2021.09.28新增 -->
    <el-tree ref="tree" class="select-tree" :style="`min-width: ${treeWidth}`" :data="options" show-checkbox node-key="id" @check="handleCheckInput" :filter-node-method="filterNode"></el-tree>
    <!-- 2021.09.28新增 若需开放则删除下方隐藏删除按钮样式 el-tag__close -->
    <el-select
      slot="reference"
      :style="`width: ${width || '300'}px`"
      ref="select"
      v-model="selectedData"
      multiple
      clearable
      :collapse-tags="true"
      @click.native="isShowSelect = !isShowSelect"
      @remove-tag="removeSelectedNodes"
      @clear="removeSelectedNode"
      class="tree-select"
    >
      <el-option v-for="item in selectOption" :key="item.id" :label="item.label" :value="item.id"></el-option>
    </el-select>
  </el-popover>
</template>

<script>
export default {
  name: 'SelectTree',
  destroyed() {
    // console.log('销毁事件');
    // this.resetData(true);
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    // 接收绑定参数
    value: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 输入框宽度
    width: {
      type: String,
      default: '',
    },
    // 选项数据
    options: {
      type: Array,
      required: true,
    },
    // 输入框占位符
    placeholder: {
      type: String,
      required: false,
      default: '请选择',
    },
  },
  data() {
    return {
      isShowSelect: false,
      // 菜单宽度
      treeWidth: 'auto',
      // 当前选中的节点
      selectedData: [],
      // 搜索框的文本
      filterText: '',
    };
  },
  created() {
    // console.log('初始化value值', this.value);
    // 获取输入框宽度同步至树状菜单宽度
    this.$nextTick(() => {
      // 初始化赋值
      this.initData();
      this.treeWidth = `${(this.width || this.$refs.select.$children[0].$refs.input.clientWidth) - 24}px`;
    });
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    isShowSelect(val) {
      // 隐藏select自带的下拉框
      this.$refs.select.blur();
    },
    value(val, oldVal) {
      // console.log('监听到了value变化', val, oldVal);
      if (val.length === 0 && oldVal.length !== 0) {
        this.resetData();
        return;
      }
      this.initData();
    },
  },
  computed: {
    // 传入的options中提取出所有的根节点（用于放入select中）
    selectOption() {
      // 展开children为一维数组操作
      const arr = [];
      this.filterChildNode(this.options, arr);
      return arr;
    },
    // 传入的options中提取出所有的非根节点（用于筛选）
    fatherOption() {
      const arr = [];
      this.filterFatherNode(this.options, arr);
      return arr;
    },
  },
  methods: {
    // 初始化赋值
    initData() {
      // 设置select选项
      this.selectedData = this.value;
      // 设置树形组件选项
      this.selectedData.forEach((m) => {
        this.$refs.tree.setChecked(m, true);
      });
    },
    // 重置
    resetData() {
      // console.log('重置');
      this.selectedData.forEach((m) => {
        this.$refs.tree.setChecked(m, false);
      });
      this.selectedData = [];
      this.$emit('change', this.selectedData);
    },
    // 点击选中树组件节点 - 复选框
    handleCheckInput(checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys) {
      // 1.获取树组件中的所有的被选中的key（包含根节点和非根节点）
      const keys = checkedKeys['checkedKeys'];
      // 2.在选中的key表中删除所有非根节点，只保留根节点
      this.selectedData = keys.filter((m) => !this.fatherOption.includes(m));
      // 3.保存根节点
      this.$emit('change', this.selectedData);
    },
    // 删除节点
    removeSelectedNodes(key) {
      this.$refs.tree.setChecked(key, false);
      this.$emit('change', this.selectedData);
    },
    // 选择框清空所有选中游戏
    removeSelectedNode() {
      this.selectedData = [];
      // 清空树形结构中的值
      this.$refs.tree.setCheckedKeys([]);
      // 传递参数
      this.$emit('change', this.selectedData);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 2022.01.11新增 递归筛选出所有的根节点 传入为node数组
    filterChildNode(nodeArr, res) {
      nodeArr.forEach((m) => {
        if (m.children) {
          this.filterChildNode(m.children, res);
        } else {
          res.push(m);
        }
      });
    },
    // 2022.01.11新增 递归筛选出所有的非根节点id 传入为node数组
    filterFatherNode(nodeArr, res) {
      nodeArr.forEach((m) => {
        if (m.children) {
          res.push(m.id);
          this.filterFatherNode(m.children, res);
        }
      });
    },
  },
};
</script>

<style>
.select-tree {
  max-height: 350px;
  overflow-y: scroll;
  margin-top: 10px;
}
/* 菜单滚动条 */
.select-tree::-webkit-scrollbar {
  z-index: 11;
  width: 6px;
}
.select-tree::-webkit-scrollbar-track,
.select-tree::-webkit-scrollbar-corner {
  background: #fff;
}
.select-tree::-webkit-scrollbar-thumb {
  border-radius: 5px;
  width: 6px;
  background: #b4bccc;
}
.select-tree::-webkit-scrollbar-track-piece {
  background: #fff;
  width: 6px;
}
</style>
