

<template>
  <div style="width: 100%; height: 100%">
    <div ref="table" class="k4-table">
      <!-- 顶部功能区 -->
      <div class="k4-table__header">
        <el-row :gutter="24">
          <el-col :span="8">
            <div class="k4-table__header--icon"><i class="el-icon-tickets"></i>列表数据</div>
          </el-col>
          <!-- 按钮区域 -->
          <el-col class="k4-table__header--setting k4-table__header--render" :span="16">
            <!-- 设置栏 -->
            <el-popover placement="bottom" width="200" trigger="click">
              <div class="k4-table__header--control">
                <!-- 列设置 - 总体 -->
                <div class="k4-table__header--control--top">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="tableAllChecked" @change="handleCheckAllChange">列展示</el-checkbox>
                  <el-button type="text" @click="handleCheckAllChange(tableModal)">重置</el-button>
                </div>
                <!-- 列设置 - 单条 -->
                <el-checkbox-group class="k4-table__header--control--content" v-model="tableGroupData" @change="tableGroupChange">
                  <el-checkbox class="k4-table__header--control--content--item" v-for="(item, index) in tableGroup" :label="item.label" :key="index">{{
                    item.label
                  }}</el-checkbox>
                </el-checkbox-group>
              </div>
              <el-tooltip slot="reference" class="item" effect="dark" content="列设置" placement="top">
                <i class="el-icon-setting k4-table__header--setting--icon"></i>
              </el-tooltip>
            </el-popover>
            <!-- 额外传入的按钮 -->
            <exSlot :style="{ marginRight: '10px' }" :render="extendRender" />
          </el-col>
        </el-row>
      </div>
      <!-- 表格区域 -->
      <el-table
        ref="multipleTable"
        class="k4-table__content"
        border
        :row-key="rowKey"
        :data="tableData['data']"
        :height="tableHeight"
        :header-cell-class-name="'k4-table__tableHeader'"
        @selection-change="handleSelectionChange"
      >
        <el-table-column v-if="isMultiple" type="selection" width="40" align="center"></el-table-column>
        <el-table-column
          v-for="(item, index) in tableModalData"
          :key="`${index}-${item.label}`"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <exSlot v-if="item.render" :render="item.render" :row="scope.row" />
            <span v-else>{{ scope.row[item.prop] || '-' }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        class="k4-table__footer"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="tableData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
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
      type: Object,
      default: () => {},
    },
    // 表格配置-源数据
    tableModal: {
      type: Array,
      default: () => [],
    },
    // 行数据 key
    rowKey: {
      type: String,
      default: 'id',
    },
    // 开启多选 - 传入多选的接收数据源
    rowSelection: {
      type: Object,
      default: () => {},
    },
    // 表格头 - 额外渲染 - jsx
    extendRender: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      // 表格相关
      tableHeight: 0, // 表格高度
      tableGroup: [], // 表格配置-控制数据
      tableGroupData: [], // 表格配置-控制数据 - 当前选中
      tableModalData: [], // 表格配置-展示数据
      tableAllChecked: true, // 表格设置-控制数据 - 全选按钮 - 全部选中
      isIndeterminate: false, // 表格设置-控制数据 - 全选按钮 - 有选中但又没有完全选中
      tableLimit: 10, // 每页条数
      tablePage: 1, // 当前页数
    };
  },
  mounted() {
    // 多选 - 设置默认值
    this.rowSelection['defaultRowKeys'] && this.toggleSelection(this.rowSelection['defaultRowKeys']());
    this.setTableGroup();
    this.$nextTick(() => {
      this.setTableHeight();
    });
  },
  computed: {
    // 是否开启多选
    isMultiple() {
      return this.rowSelection['selectedRowKeys'];
    },
  },
  methods: {
    // 获取：表格配置-源数据 -> 赋值：（表格配置-控制数据 & 表格配置-展示数据 & 表格配置-控制数据 - 当前选中）
    setTableGroup() {
      this.tableGroup = [...this.tableModal];
      this.tableModalData = [...this.tableModal];
      this.tableGroupData = this.tableModal.map((m) => m.label);
    },
    // 改变：表格配置-控制数据 -> 修改：表格配置-展示数据
    tableGroupChange(val) {
      const current = this.tableModal.filter((m) => val.includes(m.label));
      this.tableModalData = current;
      const count = current.length;
      this.tableAllChecked = count === this.tableModal.length;
      this.isIndeterminate = count > 0 && count < this.tableModal.length;
      this.$nextTick(() => {
        this.$refs.multipleTable.doLayout();
      });
    },
    // 改变：表格配置-控制数据 - 全选按钮 -> 修改：表格配置-展示数据
    handleCheckAllChange(val) {
      this.tableGroupData = val ? this.tableModal.map((m) => m.label) : [];
      this.tableModalData = val ? [...this.tableModal] : [];
      this.isIndeterminate = false;
      this.tableAllChecked = val ? true : false;
      this.$nextTick(() => {
        this.$refs.multipleTable.doLayout();
      });
    },
    // 获取 table 高度以此计算 table 表单高度
    setTableHeight() {
      this.tableHeight = this.$refs.table.clientHeight - 48 - 40;
    },
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
      this.rowSelection['selectedRowKeys'] = val;
    },
    // 清除复选框
    handleSelectionClear() {
      this.$refs.multipleTable.clearSelection();
    },
    // 	pageSize 改变时会触发
    handleSizeChange(limit) {
      this.tableLimit = limit;
      this.$emit('pageChange', this.tablePage, this.tableLimit);
    },
    // currentPage 改变时会触发
    handleCurrentChange(page) {
      this.tablePage = page;
      this.$emit('pageChange', this.tablePage, this.tableLimit);
    },
  },
};
</script>
