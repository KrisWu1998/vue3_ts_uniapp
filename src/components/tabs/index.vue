<template>
  <view class="reset-tabs-wrap">
    <view
      v-for="(tabsItem, tabsIndex) in tabs"
      :key="tabsIndex"
      :class="['reset-tabs-item', tabsItem.number ? 'hasMsg': '', activeIndex == tabsIndex ? 'active' : '']"
      @tap="handleChangeActiveIndex(tabsIndex)"
    >
      {{ tabsItem.title }}
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  props: {
    tabs: {
      type: Array,
      default: () => ([])
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  setup (_, { emit }) {
    const methods = reactive({
      handleChangeActiveIndex (index:number): void {
        emit('update:activeIndex', index);
      }
    })
    return {
      ...toRefs(methods)
    }
  }
})
</script>

<style lang="less" scoped>
.reset-tabs-wrap {
  display: flex;
  .reset-tabs-item {
    display: inline-flex;
    position: relative;
    margin-right: 50rpx;
    /* padding-right: 29.5rpx; */
    padding-top: 10rpx;
    padding-bottom: calc(18rpx + 8rpx);
    font-size: 32rpx;
    color: rgba(102, 102, 102, 1);
    &.active {
      padding-top: 0;
      font-size: 40rpx;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 40rpx;
        height: 8rpx;
        margin-left: -20rpx;
        background: rgba(0, 200, 190, 1);
        border-radius: 5rpx;
      }
    }
    &.hasMsg {
      &::after {
        content: '';
        position: absolute;
        top: -16rpx;
        right: -16rpx;
        width: 16rpx;
        height: 16rpx;
        background: orange;
        border-radius: 50%;
      }
    }
  }
}
</style>