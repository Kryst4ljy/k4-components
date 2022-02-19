<template>
  <div>
    <el-collapse v-model="actName" accordion>
      <el-collapse-item name="1">
        <template slot="title">
          <div :class="$style.filterTitle"><i :class="$style.filterIcon" class="el-icon-document"></i>筛选项</div>
        </template>
        <div :class="$style.filter">
          <el-row :gutter="20">
            <el-col :span="6" v-for="(item, index) in config" :key="index">
              <!-- input - 输入框 -->
              <div v-if="item.type === 'k-input'" :class="$style['grid-content']">
                <span>{{ `${item.label}：` }}</span>
                <el-input v-model="form[item.key]" :placeholder="item.placeholder" clearable></el-input>
              </div>
              <!-- select - 选择器 -->
              <div v-if="item.type === 'k-select'" :class="$style['grid-content']">
                <span>{{ `${item.label}：` }}</span>
                <el-select :class="$style.inner" v-model="form[item.key]" :multiple="item.multiple" :collapse-tags="true" :placeholder="item.placeholder" filterable clearable>
                  <el-option v-for="(m, i) in item.options" :key="`${i}-${m.value}`" :label="m.label" :value="m.value"></el-option>
                </el-select>
              </div>
              <!-- select-tree - 树形选择器 -->
              <div v-if="item.type === 'k-select-tree'" :class="$style['grid-content']">
                <span>{{ `${item.label}：` }}</span>
                <SelectTree :class="$style.inner" v-model="form[item.key]" :width="'100%'" :options="item.options" :placeholder="item.placeholder"></SelectTree>
              </div>
              <!-- date-picker-singer 单个日期选择器 -->
              <div v-if="item.type === 'k-date-picker-singer'" :class="$style['grid-content']">
                <span>{{ `${item.label}：` }}</span>
                <el-date-picker
                  v-model="form[item.key]"
                  :type="item.dateType || 'date'"
                  :format="item.format"
                  :placeholder="item.placeholder"
                  :value-format="item.valueFormat || item.format"
                ></el-date-picker>
              </div>
              <!-- date-picker-range 范围日期选择器 -->
              <div v-if="item.type === 'k-date-picker-range'" :class="$style['grid-content']">
                <span>{{ `${item.label}：` }}</span>
                <el-date-picker
                  v-model="form[item.key]"
                  :type="item.dateType || 'daterange'"
                  :format="item.format"
                  :value-format="item.valueFormat || item.format"
                  range-separator="至"
                  start-placeholder="开始"
                  end-placeholder="结束"
                ></el-date-picker>
              </div>
            </el-col>
          </el-row>
          <!-- 按钮 -->
          <el-row :gutter="20">
            <el-col class="button-col" :span="20">
              <el-button type="primary" @click="handleSearch">搜索</el-button>
              <el-button type="warning" @click="handleReset">重置</el-button>
              <slot name="button"></slot>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import SelectTree from '../../SelectTree/src/main.vue';

export default {
  name: 'FilterBar',
  components: { SelectTree },
  props: {
    config: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      actName: ['1'],
      form: {},
    };
  },
  methods: {
    // 点击搜索
    handleSearch() {
      this.$emit('handleSearch', this.form);
    },
    // 点击重置
    handleReset() {
      this.form = {};
    },
  },
};
</script>

<style lang='scss' module>
.filterTitle {
  width: 100%;
  padding-left: 14px;
  text-align: left;
  .filterIcon {
    margin-right: 4px;
  }
}
.filter {
  width: 100%;
  margin-bottom: 10px;
  padding: 14px 14px 0px 14px;

  :global {
    .el-select {
      width: 100%;
      .el-tag {
        max-width: 50% !important;
      }
    }
    .el-select__tags {
      width: 20px;
      flex-wrap: nowrap !important;
    }
    .button-col {
      display: flex;
    }
    .el-date-editor {
      width: 100% !important;
      .el-input__icon {
        width: 15px;
      }
      .el-range-input {
        font-size: 10px !important;
      }
      .el-range-separator {
        font-size: 10px !important;
        width: 10% !important;
      }
      .el-range__close-icon {
        width: 15px !important;
      }
    }
  }
}
.grid-content {
  min-height: 40px;
  margin-bottom: 18px;
  display: flex;
  > span {
    flex: none;
    height: 40px;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 40px;
    text-align: left;
  }
  .inner {
    flex: 1;
  }
}
</style>