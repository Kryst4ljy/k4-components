<template>
  <div class="box">
    <el-container style="height: 100%">
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header height="64px">Header</el-header>
        <el-main>
          <!-- 弹窗 -->
          <DialogForm
            :dialogVisible="dialogVisible"
            :dialogModal="dialogModal"
            :dialogRules="dialogRules"
            :title="title"
            :width="width"
            @dialogClose="dialogClose"
            @dialogSubmit="dialogSubmit"
          ></DialogForm>
          <!-- 筛选 -->
          <FilterBar :config="filterData" @handleSearch="handleSearch">
            <template v-slot:button>
              <el-button type="success" @click="dialogShow">添 加</el-button>
            </template>
          </FilterBar>
          <!-- 表格 -->
          <Table
            ref="table"
            :row-key="'id'"
            :tableData="tableData"
            :tableModal="tableModal"
            :rowSelection="rowSelection"
            :extend-render="extendRender"
            @pageChange="pageChange"
          ></Table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterData: [
        {
          type: 'k-input',
          key: 'key1',
          placeholder: '输入框',
          label: '输入框',
        },
        {
          type: 'k-input-range',
          key: ['range0', 'range1'],
          placeholder: ['范围输入框', '范围输入框'],
          label: '范围输入框',
        },
        {
          type: 'k-select',
          key: 'key2',
          label: '选择器',
          placeholder: '选择器',
          options: [
            { label: '1', value: 1 },
            { label: '2123123132123', value: 2 },
            { label: '212312313212333', value: 3 },
          ],
          multiple: true,
        },
        {
          type: 'k-select-tree',
          key: 'key3',
          label: '树形选择器',
          placeholder: '树形选择器',
          options: [
            // 配置参考 element 的 tree 格式
            {
              label: '123',
              id: 1,
              children: [
                {
                  label: '123123',
                  id: 2,
                  children: [
                    {
                      label: '1231223',
                      id: 3,
                    },
                  ],
                },
              ],
            },
            {
              label: '565',
              id: 4,
              children: [
                {
                  label: '75567',
                  id: 5,
                  children: [
                    {
                      label: '56756756',
                      id: 6,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'k-date-picker-singer', // 单个日期选择器
          key: 'key4',
          label: '日期选择器',
          placeholder: '单个日期选择器',
          dateType: 'date', // 可选择参考 element 的 date-picker 的 type
          format: 'yyyy-MM-dd', // 回显字符
          valueFormat: 'yyyy-MM', // value 传回字符 不传默认为 format
        },
        {
          type: 'k-date-picker-range', // 范围日期选择器
          key: 'key5',
          label: '日期选择器',
          placeholder: '范围日期选择器',
          dateType: 'daterange', // 可选择参考 element 的 date-picker 的 type
          format: 'yyyy-MM-dd', // 回显字符
          valueFormat: 'yyyy-MM', // value 传回字符 不传默认为 format
        },
      ],
      // DialogForm 配置
      title: '测试', // 标题
      width: '500px', // 宽度
      dialogVisible: false, // 显示与否
      dialogModal: [
        {
          type: 'k-input',
          key: 'key1',
          label: '输入框',
          placeholder: '输入框',
        },
        {
          type: 'k-textarea',
          key: 'key0',
          label: '输入区域',
          placeholder: '输入区域',
          rows: 3,
        },
        {
          type: 'k-input-range',
          key: ['key2', 'key3'],
          label: '范围输入框',
          placeholder: ['范围输入框', '范围输入框'],
          required: true, // 当需要验证时手动开启 - rules 需要配置
        },
        {
          type: 'k-select',
          key: 'key4',
          label: '选择器',
          placeholder: '选择器',
          options: [
            { label: '1', value: 1 },
            { label: '2123123132123', value: 2 },
            { label: '212312313212333', value: 3 },
          ],
          multiple: true,
        },
        {
          type: 'k-select-tree',
          key: 'key5',
          label: '树形选择器',
          placeholder: '树形选择器',
          options: [
            // 配置参考 element 的 tree 格式
            {
              label: '123',
              id: 1,
              children: [
                {
                  label: '123123',
                  id: 2,
                  children: [
                    {
                      label: '1231223',
                      id: 3,
                    },
                  ],
                },
              ],
            },
            {
              label: '565',
              id: 4,
              children: [
                {
                  label: '75567',
                  id: 5,
                  children: [
                    {
                      label: '56756756',
                      id: 6,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'k-date-picker-singer', // 单个日期选择器
          key: 'key6',
          label: '日期选择器',
          placeholder: '单个日期选择器',
          dateType: 'date', // 可选择参考 element 的 date-picker 的 type
          format: 'yyyy-MM-dd', // 回显字符
          valueFormat: 'yyyy-MM', // value 传回字符 不传默认为 format
        },
        {
          type: 'k-date-picker-range', // 范围日期选择器
          key: 'key7',
          label: '日期选择器',
          placeholder: '范围日期选择器',
          dateType: 'daterange', // 可选择参考 element 的 date-picker 的 type
          format: 'yyyy-MM-dd', // 回显字符
          valueFormat: 'yyyy-MM', // value 传回字符 不传默认为 format
        },
        {
          type: 'k-switch',
          key: 'key8',
          label: '开关',
        },
        {
          type: 'k-checkbox',
          key: 'key9',
          label: '复选框',
          options: [{ label: '地推活' }, { label: '线动' }, { label: '地推活动' }],
        },
        {
          type: 'k-radio',
          key: 'key10',
          label: '单选框',
          options: [{ label: '地推活' }, { label: '线动' }, { label: '地推活动' }],
        },
      ],
      dialogRules: {
        key0: [{ required: true, message: '请输入', trigger: 'blur' }],
        key1: [{ required: true, message: '请输入', trigger: 'blur' }],
        key2: [{ required: true, message: '请输入', trigger: 'blur' }],
        key3: [{ required: true, message: '请输入', trigger: 'blur' }],
        key4: [{ required: true, message: '请输入', trigger: 'change' }],
        key5: [{ required: true, message: '请输入', trigger: 'change' }],
        key6: [{ required: true, message: '请输入', trigger: 'change' }],
        key7: [{ required: true, message: '请输入', trigger: 'change' }],
        key9: [{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }],
        key10: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
      },
      // Table 配置
      tableData: {
        total: 201,
        data: [
          {
            id: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 12313123123121518 弄',
          },
          {
            id: 2,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 12313123123121518 弄',
          },
          {
            id: 3,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 12313123123121518 弄',
          },
          {
            id: 4,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 12313123123121518 弄',
          },
          {
            id: 5,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 12313123123121518 弄',
          },
          {
            id: 6,
            date: '2016-05-02',
            name: 'end',
            address: '上海市普陀区金沙江路 12313123123121518 弄',
          },
        ],
      },
      tableModal: [
        { prop: 'date', label: '时间', width: '120' },
        { prop: 'name', label: '名字', width: '120' },
        { prop: 'address', label: '地址', width: '260' },
        {
          label: '操作',
          width: '260',
          render: (params) => {
            return <el-button onClick={() => this.test(params)}>测试</el-button>;
          },
        },
      ],
      rowSelection: {
        selectedRowKeys: [], // 选中的列表数据 - 此选项传入开启多选
        defaultRowKeys: () => [this.tableData['data'][0]], // 默认选中的数据 - 传入源数据选项
      },
    };
  },
  methods: {
    handleSearch(form) {
      console.log(form);
    },
    // 关闭弹窗
    dialogClose() {
      this.dialogVisible = false;
    },
    // 显示弹窗
    dialogShow() {
      this.dialogVisible = true;
    },
    // 弹窗提交
    dialogSubmit(form) {
      console.log('form', form);
    },
    // 表格测试
    test(params) {
      console.log(params);
    },
    // 表格头 - 额外渲染 jsx
    extendRender() {
      return (
        <el-button type="info" plain onClick={() => this.$refs['table'].handleSelectionClear()}>
          清 除
        </el-button>
      );
    },
    // 表格 page 或 limit 改变后回调函数
    pageChange(page, limit) {
      console.log(page, limit);
    },
  },
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
}
.box {
  width: 100%;
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 64px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #f0f2f5;
  color: #333;
}
</style>