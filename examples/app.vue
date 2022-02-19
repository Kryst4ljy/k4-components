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
  text-align: center;
}
</style>