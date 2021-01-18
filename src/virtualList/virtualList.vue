<template>
  <div class="list-view" @scroll="handleScroll">
    <div
      class="list-view-phantom"
      :style="{
        height: `${contentHeight}px`,
      }"
    ></div>
    <div ref="content" class="list-view-content">
      <div
        class="list-view-item"
        :style="{
          height: `${itemHeight}px`,
        }"
        v-for="(item, index) in visibleData"
        :key="index"
      >
        <slot v-bind:item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VirtualList",
  props: {
    data: {
      type: Array,
      required: true,
    },
    itemHeight: {
      type: Number,
      default: 30,
    },
    estimatedItemSize: {
      // 预估未计算元素的高度
      type: Number,
      default: 30,
    },
    itemSizeGetter: {
      // 计算每项可视区域列表项的方法
      type: Function,
    },
  },
  data() {
    return {
      lastMeasuredIndex: -1,
      startIndex: 0,
      sizeAndOffsetCahce: {},
      visibleData: [], // 可视区域试图数组
    };
  },
  mounted() {
    this.updateVisibleData();
  },
  computed: {
    // contentHeight 就等于缓存过的列表项的高度和 + 未缓存过的列表项的数量 * estimatedItemSize。
    contentHeight() {
      const { data, lastMeasuredIndex, estimatedItemSize } = this;
      let itemCount = data.length;
      if (lastMeasuredIndex >= 0) {
        const lastMeasuredSizeAndOffset = this.getLastMeasuredSizeAndOffset();
        return (
          lastMeasuredSizeAndOffset.offset +
          lastMeasuredSizeAndOffset.size +
          (itemCount - 1 - lastMeasuredIndex) * estimatedItemSize
        );
      } else {
        return itemCount * estimatedItemSize;
      }
    },
  },
  methods: {
    // 计算过高度的列表项的高度和
    getLastMeasuredSizeAndOffset() {
      return this.lastMeasuredIndex >= 0
        ? this.sizeAndOffsetCahce[this.lastMeasuredIndex]
        : { offset: 0, size: 0 };
    },
    // 获取初始项的页数
    findNearestItemIndex(scrollTop) {
      // const { data } = this;
      // let total = 0;
      // for (let i = 0, j = data.length; i < j; i++) {
      //   // 从列表第一项计算出累计高度
      //   // const size = itemSizeGetter.call(null, data[i], i);
      //   // 优化：从缓存中读取累计高度
      //   const size = this.getItemSizeAndOffset(i).size;
      //   total += size;
      //   if (total >= scrollTop || i === j - 1) {
      //     // 当累计高度超过实际scrollTop时，可知此时的i就是可视区域的第一项页数
      //     return i;
      //   }
      // }

      // return 0;

      // !!!!!!!! 优化已缓存结果的搜索性能
      const lastMeasuredOffset = this.getLastMeasuredSizeAndOffset().offset;
      if (lastMeasuredOffset > scrollTop) {
        return this.binarySearch(0, this.lastMeasuredIndex, scrollTop);
      } else {
        return this.exponentialSearch(scrollTop);
      }
    },
    // 计算偏移量，入参为可视区域起始页数
    getItemSizeAndOffset(index) {
      const {
        lastMeasuredIndex,
        sizeAndOffsetCahce,
        data,
        itemSizeGetter,
      } = this;
      if (lastMeasuredIndex >= index) {
        return sizeAndOffsetCahce[index];
      }
      let offset = 0;
      if (lastMeasuredIndex >= 0) {
        const lastMeasured = sizeAndOffsetCahce[lastMeasuredIndex];
        if (lastMeasured) {
          offset = lastMeasured.offset + lastMeasured.size;
        }
      }
      for (let i = lastMeasuredIndex + 1; i <= index; i++) {
        const item = data[i];
        const size = itemSizeGetter.call(null, item, i);
        sizeAndOffsetCahce[i] = {
          size,
          offset,
        };
        offset += size;
      }
      if (index > lastMeasuredIndex) {
        this.lastMeasuredIndex = index;
      }
      return sizeAndOffsetCahce[index];
    },
    // 刷新视图区列表项数据
    updateVisibleData(scrollTop) {
      scrollTop = scrollTop || 0;
      const start = this.findNearestItemIndex(scrollTop);
      const end = this.findNearestItemIndex(scrollTop + this.$el.clientHeight);
      this.visibleData = this.data.slice(
        start,
        Math.min(end + 1, this.data.length)
      );
      this.$refs.content.style.webkitTransform = `translate3d(0, ${
        this.getItemSizeAndOffset(start).offset
      }px, 0)`;
    },
    // 滚动时触发
    handleScroll() {
      const scrollTop = this.$el.scrollTop;
      this.updateVisibleData(scrollTop);
    },
    // 二分查找来优化已缓存的结果的搜索性能-未理解
    binarySearch(low, high, offset) {
      let index;

      while (low <= high) {
        const middle = Math.floor((low + high) / 2);
        const middleOffset = this.getItemSizeAndOffset(middle).offset;
        if (middleOffset === offset) {
          index = middle;
          break;
        } else if (middleOffset > offset) {
          high = middle - 1;
        } else {
          low = middle + 1;
        }
      }

      if (low > 0) {
        index = low - 1;
      }

      if (typeof index === "undefined") {
        index = 0;
      }

      return index;
    },
    exponentialSearch(scrollTop) {
      let bound = 1;
      const data = this.data;
      const start = this.lastMeasuredIndex >= 0 ? this.lastMeasuredIndex : 0;
      while (
        start + bound < data.length &&
        this.getItemSizeAndOffset(start + bound).offset < scrollTop
      ) {
        bound = bound * 2;
      }
      return this.binarySearch(
        start + Math.floor(bound / 2),
        Math.min(start + bound, data.length),
        scrollTop
      );
    },
  },
};
</script>


<style scoped>
.list-view {
  /* width: 500px;
  height: 400px;
  overflow: auto;
  position: relative;
  border: 1px solid #aaa; */
}

.list-view-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.list-view-content {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
}

.list-view-item {
  padding: 5px;
  color: #666;
  line-height: 30px;
  box-sizing: border-box;
}
</style>