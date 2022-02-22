

<template>
  <div style="width: 100%; height: 100%">
    <div class="k4-table">
      <!-- 顶部功能区 -->
      <div class="k4-table__header">
        <el-row :gutter="24">
          <el-col :span="18">
            <el-button type="info" @click="handleSelectionClear" plain>清 除</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 表格区域 -->
      <el-table ref="multipleTable" class="k4-table__content" :data="tableData" border :header-cell-class-name="'k4-table__tableHeader'" @selection-change="handleSelectionChange">
        <el-table-column v-if="multiple" type="selection" width="40" align="center"></el-table-column>
        <el-table-column v-for="(item, index) in tableModal" :key="index" :prop="item.prop" :label="item.label" :width="item.width">
          <template slot-scope="scope">
            <exSlot v-if="item.render" :render="item.render" :row="scope.row" />
            <span v-else>{{ scope.row[item.prop] || '-' }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import exSlot from './exSlot.vue';

export default {
  name: 'Table',
  components: { exSlot },
  props: {
    // 表格数据
    tableData: {
      type: Array,
      default: () => [],
    },
    // 表格配置
    tableModal: {
      type: Array,
      default: () => [],
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false,
    },
    multipleCB: {},
  },
  data() {
    return { multipleSelection: [] };
  },
  methods: {
    // 设置复选框
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 选中复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 清除复选框
    handleSelectionClear() {
      this.$refs.multipleTable.clearSelection();
    },
  },
};
</script>
