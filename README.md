# k4-components

在日常开发过程中，基于Vue封装的一些组件。

## 使用 Install
```
npm install k4-components
```

## 快速开始 Quick Start
```
import { VirtualList, SelectTree } from 'k4-components';

Vue.component(VirtualList.name, VirtualList);
```

## 组件列表 Components List
1. 虚拟列表组件 - VirtualList
2. 树形下拉框组件 - SelectTree

## 1. VirtualList - 虚拟列表
```
import { VirtualList } from 'k4-components';

Vue.component(VirtualList.name, VirtualList);
```

### 入参说明
- data：虚拟列表的数据源；
- itemHeight：虚拟列表项每项初始高度；
- itemSizeGetter：虚拟列表项获取自身高度方法（自定义）

```
// itemSizeGetter示例
itemSizeGetter(obj) {
  let itemH = 0;
  const word = ['chat_at_time', 'level', 'server_name', 'type_word', 'role_name', 'vip_level', 'message']
  if(obj) {
    let wordL = 0;
    word.forEach((item, index) => {
      wordL += obj[item] ? obj[item].toString().length : 0;
    })
    wordL += 10;
    itemH = Math.ceil((wordL * 12.5) / this.$refs.box.$el.offsetWidth) * 30;
  } else {
    itemH = 30;
  }
  return 30;
},
```

## 2. SelectTree - 树形下拉框
![2022-02-19 15 15 07](https://user-images.githubusercontent.com/42908230/154791087-21303bf8-61fc-437b-b9a8-38608cbc438d.gif)

**树形组件是基于ElementUI的二次封装，所以使用此组件的项目必须使用Vue且引入过ElementUI**

```
import { SelectTree } from 'k4-components';

Vue.component(SelectTree.name, SelectTree);
```

### 入参说明
- value：树形组件接受绑定参数；
- width：树形组件输入框宽度；
- options：树形组件传入的选项数据，按照ElementUI的Tree组件options；
- placeholder：树形组件输入框占位符；

## 3. FilterBar - 后台页面通用筛选器组件
<img width="1290" alt="截屏2022-02-20 上午1 10 28" src="https://user-images.githubusercontent.com/42908230/154811231-be3a8ad8-5673-429c-bb0f-d3e08a3aa16b.png">


### 入参说明
- config：配置项数组，通过一个数组配置需要使用的筛选项。下面为一个示例 👇👇👇
```
<template>
  <!-- 筛选 -->
  <FilterBar :config="filterData" @handleSearch="handleSearch">
     <template v-slot:button>
       <el-button type="success" @click="dialogShow">添 加</el-button>
      </template>
   </FilterBar>
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
    };
  },
  methods: {
    handleSearch(form) {
      console.log(form);
    },
  },
};
</script>
```

## 4. DialogForm - 后台页面通用弹窗组件
<img width="587" alt="截屏2022-02-20 上午1 14 36" src="https://user-images.githubusercontent.com/42908230/154811418-67fbea95-147e-49fd-846f-f87c515ab9b1.png">

### 入参说明
- dialogVisible：弹窗组件是否显示。
- title：弹窗标题。
- width：宽度，默认为500px。
- dialogModal：表单配置项，完整示例如下面代码所示。
- dialogRules：表单验证项，参考 element 的表单验证。

下面为一个示例 👇👇👇

```
<template>
  <!-- 弹窗 -->
  <DialogForm :dialogVisible="dialogVisible" :dialogModal="dialogModal" :dialogRules="dialogRules" :title="title" :width="width" @dialogClose="dialogClose">      </DialogForm>
</template>

<script>
export default {
  data() {
    return {
      // DialogForm 配置
      title: '测试', // 标题
      width: '500px', // 宽度
      dialogVisible: true, // 显示与否
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
    };
  },
  methods: {
    // 关闭弹窗
    dialogClose() {
      this.dialogVisible = false;
    },
    // 显示弹窗
    dialogShow() {
      this.dialogVisible = true;
    },
  },
};
</script>
```

## 5. Table - 后台页面通用表格组件
![Feb-25-2022 15-09-10](https://user-images.githubusercontent.com/42908230/155670742-308cd8f1-b59e-4d16-9e30-0c53c67f5e7f.gif)

### 入参说明
- row-key：指定每行数据 key 值，默认为 id。
- tableData：表格配置-数据源，格式 `{total: 201, data: Array<Object>}` ，可参考下面示例中的写法。
- tableModal：表格配置-列表配置，格式 `[{prop: 'date', label: '时间', width: '120', render: (params) => jsx}]`，可以给每一个配置项传入 render 函数，该函数返回一个 jsx ，用于灵活配置表格中的列表项。 
- rowSelection：表格配置-多选配置，格式 `{selectedRowKeys: [], defaultRowKeys: () => [this.tableData['data'][0]],}`，其中，selectedRowKeys 为多选的绑定数据源，配置此参数则为开启多选；defaultRowKeys 为默认配置项，必须引用传入【tableData】表格配置-数据源中的数据。
- extendRender：表格配置-列表头部自定义配置，传入一个 render 函数即可。渲染在如下图所示区域。
![image](https://user-images.githubusercontent.com/42908230/155668750-bf2dbecd-d604-45ee-a15f-7c80429b5891.png)
- pageChange：表格分页器改变回调函数，回调函数两个参数分别为改变后的 page 以及 limit。

下面为一个示例 👇👇👇
```
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

----------------------------------------------------
export default {
  data() {
    return {
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
    }
  },
  methods: {
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
  }
}

```
