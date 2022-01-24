<template>
  <div class="box">
    <SelectTree
      :value="treeData"
      :options="[]"
      @change="
        (val) => {
          treeData = val;
        }
      "
    ></SelectTree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeData: [],
    };
  },
};
</script>

<style>
.box {
  width: 200px;
  height: 30px;
}
</style>