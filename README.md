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
![截屏2022-02-19 下午3 00 15](https://user-images.githubusercontent.com/42908230/154790545-5a8f8b75-4c96-414d-ab79-ff05ce6d1be3.png)


### 入参说明
- config：配置项数组，通过一个数组配置需要使用的筛选项。下面为一个示例 👇👇👇
```
<template>
  <div class="box">
    <el-container style="height: 100%">
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header height="64px">Header</el-header>
        <el-main
          ><FilterBar :config="filterData" @handleSearch="handleSearch">
            <template v-slot:button>
              <el-button type="success">添加</el-button>
            </template></FilterBar
          ></el-main
        >
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


