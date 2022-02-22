<template>
  <div>
    <el-collapse v-model="actName" accordion>
      <el-collapse-item name="1">
        <template slot="title">
          <div class="k4-filter__title"><i class="k4-filter__title--icon el-icon-document"></i>筛选项</div>
        </template>
        <div class="k4-filter__content">
          <el-row :gutter="20">
            <el-col :span="6" v-for="(item, index) in config" :key="index">
              <!-- input - 输入框 -->
              <div v-if="item.type === 'k-input'" class="k4-filter__item">
                <span>{{ `${item.label}：` }}</span>
                <el-input v-model="form[item.key]" :placeholder="item.placeholder" clearable></el-input>
              </div>
              <!-- input-range 范围输入框 -->
              <div v-if="item.type === 'k-input-range'" class="k4-filter__item">
                <span>{{ `${item.label}：` }}</span>
                <el-col :span="11" :style="{ padding: '0px' }"><el-input v-model="form[item.key[0]]" :placeholder="item.placeholder[0]" clearable></el-input></el-col>
                <el-col :span="2" :style="{ padding: '0px' }" class="k4-filter__content--line">-</el-col>
                <el-col :span="11" :style="{ padding: '0px' }"><el-input v-model="form[item.key[1]]" :placeholder="item.placeholder[1]" clearable></el-input></el-col>
              </div>
              <!-- select - 选择器 -->
              <div v-if="item.type === 'k-select'" class="k4-filter__item">
                <span>{{ `${item.label}：` }}</span>
                <el-select class="k4-filter__item--inner" v-model="form[item.key]" :multiple="item.multiple" :collapse-tags="true" :placeholder="item.placeholder" filterable clearable>
                  <el-option v-for="(m, i) in item.options" :key="`${i}-${m.value}`" :label="m.label" :value="m.value"></el-option>
                </el-select>
              </div>
              <!-- select-tree - 树形选择器 -->
              <div v-if="item.type === 'k-select-tree'" class="k4-filter__item">
                <span>{{ `${item.label}：` }}</span>
                <SelectTree class="k4-filter__item--inner" v-model="form[item.key]" :width="'100%'" :options="item.options" :placeholder="item.placeholder"></SelectTree>
              </div>
              <!-- date-picker-singer 单个日期选择器 -->
              <div v-if="item.type === 'k-date-picker-singer'" class="k4-filter__item">
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
              <div v-if="item.type === 'k-date-picker-range'" class="k4-filter__item">
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
              <el-button type="primary" @click="handleSearch">搜 索</el-button>
              <el-button type="warning" @click="handleReset">重 置</el-button>
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