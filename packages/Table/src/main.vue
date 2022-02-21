

<template>
  <div>
    <div class="k4-table">
      <!-- 顶部功能区 -->
      <div class="k4-table-header">123</div>
      <!-- 表格区域 -->
      <el-table class="k4-table-content" :data="tableData" border :header-cell-class-name="'k4-table-tableHeader'">
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
  },
  data() {
    return {
      a: 1,
    };
  },
};
</script>
