<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" :before-close="handleClose">
      <!-- 表格部分 -->
      <div :class="$style.dialogForm">
        <el-form ref="form" :model="form" :rules="dialogRules" label-width="100px">
          <div v-for="(item, index) in dialogModal" :key="index">
            <!-- k-input 输入框 -->
            <el-form-item v-if="item.type === 'k-input'" :label="item.label" :prop="item.key">
              <el-input v-model="form[item.key]" :placeholder="item.placeholder" clearable></el-input>
            </el-form-item>
            <!-- k-textarea 输入区域 -->
            <el-form-item v-if="item.type === 'k-textarea'" :label="item.label" :prop="item.key">
              <el-input type="textarea" v-model="form[item.key]" :rows="item.rows" :placeholder="item.placeholder" clearable></el-input>
            </el-form-item>
            <!-- input-range 范围输入框 -->
            <el-form-item v-if="item.type === 'k-input-range'" :label="item.label" :required="item.required">
              <el-col :span="11" :style="{ padding: '0px' }">
                <el-form-item :prop="item.key[0]">
                  <el-input v-model="form[item.key[0]]" :placeholder="item.placeholder[0]" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" :style="{ padding: '0px' }" :class="$style.line">-</el-col>
              <el-col :span="11" :style="{ padding: '0px' }">
                <el-form-item :prop="item.key[1]">
                  <el-input v-model="form[item.key[1]]" :placeholder="item.placeholder[1]" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
            <!-- select 选择器 -->
            <el-form-item v-if="item.type === 'k-select'" :label="item.label" :prop="item.key">
              <el-select style="width: 100%" v-model="form[item.key]" :multiple="item.multiple" :collapse-tags="true" :placeholder="item.placeholder" filterable clearable>
                <el-option v-for="(m, i) in item.options" :key="`${i}-${m.value}`" :label="m.label" :value="m.value"></el-option>
              </el-select>
            </el-form-item>
            <!-- select-tree 树形选择器 -->
            <el-form-item v-if="item.type === 'k-select-tree'" :label="item.label" :prop="item.key">
              <SelectTree ref="selectTree" v-model="form[item.key]" :width="'100%'" :options="item.options" :placeholder="item.placeholder"></SelectTree>
            </el-form-item>
            <!-- date-picker-singer 单个日期选择器 -->
            <el-form-item v-if="item.type === 'k-date-picker-singer'" :label="item.label" :prop="item.key">
              <el-date-picker
                style="width: 100%"
                v-model="form[item.key]"
                :type="item.dateType || 'date'"
                :format="item.format"
                :placeholder="item.placeholder"
                :value-format="item.valueFormat || item.format"
              ></el-date-picker>
            </el-form-item>
            <!-- date-picker-range 范围日期选择器 -->
            <el-form-item v-if="item.type === 'k-date-picker-range'" :label="item.label" :prop="item.key">
              <el-date-picker
                style="width: 100%"
                v-model="form[item.key]"
                :type="item.dateType || 'daterange'"
                :format="item.format"
                :value-format="item.valueFormat || item.format"
                range-separator="至"
                start-placeholder="开始"
                end-placeholder="结束"
              ></el-date-picker>
            </el-form-item>
            <!-- switch 开关 -->
            <el-form-item v-if="item.type === 'k-switch'" :label="item.label" :prop="item.key">
              <el-switch v-model="form[item.key]"></el-switch>
            </el-form-item>
            <!-- checkbox 复选框 -->
            <el-form-item v-if="item.type === 'k-checkbox'" :label="item.label" :prop="item.key">
              <el-checkbox-group v-model="form[item.key]">
                <el-checkbox v-for="(m, i) in item.options" :key="`${index}-${i}`" :name="item.key" :label="m.label"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <!-- radio 单选框 -->
            <el-form-item v-if="item.type === 'k-radio'" :label="item.label" :prop="item.key">
              <el-radio-group v-model="form[item.key]">
                <el-radio v-for="(m, i) in item.options" :key="`${index}-${i}`" :name="item.key" :label="m.label"></el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="handleClose">取 消</el-button>
        <el-button type="warning" @click="handleReset">重 置</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
<script>
export default {
  name: 'DialogForm',
  props: {
    // 是否显示
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    // 标题
    title: {
      type: String,
      default: '',
    },
    // 宽度
    width: {
      type: String,
      default: '600px',
    },
    // 表单项列表
    dialogModal: {
      type: Array,
      default: () => [],
    },
    // 表单项验证
    dialogRules: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {}, // 表单
    };
  },
  created() {
    this.initForm();
  },
  methods: {
    // 初始化表单数据
    initForm() {
      this.dialogModal.forEach((m) => {
        switch (m.type) {
          case 'k-select':
            // 避免触发表单验证
            m.multiple ? this.$set(this.form, m.key, []) : this.$set(this.form, m.key, '');
            break;
          case 'k-select-tree':
          case 'k-checkbox':
            this.$set(this.form, m.key, []);
            break;
          case 'k-switch':
            this.$set(this.form, m.key, false);
            break;
          case 'k-input-range':
            this.$set(this.form, m.key[0], '');
            this.$set(this.form, m.key[1], '');
            break;
          default:
            this.$set(this.form, m.key, '');
        }
      });
    },
    // 关闭弹窗
    handleClose() {
      this.$emit('dialogClose');
    },
    // 点击确定
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          console.log('form', this.form);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 点击充值
    handleReset() {
      this.$refs['form'].resetFields();
      console.log(this.form);
    },
  },
};
</script>

<style lang="scss" module>
.dialogForm {
  width: 100%;
  min-height: 200px;
  // background-color: pink;

  .line {
    text-align: center;
  }

  :global {
    .el-range-separator {
      font-size: 10px !important;
      width: 10% !important;
    }
  }
}
</style>