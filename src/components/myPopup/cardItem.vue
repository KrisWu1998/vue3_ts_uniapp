<template>
  <view class="item">
    <view class="circle" :style="{ background: info.color }"></view>
    <view class="label">
      {{ info.label }}
    </view>
    <view
      :class="['item-button', info.isGet ? 'disable' : '']"
      @click="handleChangeStatus"
    >
      {{ info.isGet ? "已领取" : `+${info.addMoney}租币` }}
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
    parentIndex: {
      type: Number,
      default: 0,
    },
    childIndex: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const methods = reactive({
      handleChangeStatus(): void {
        const { info, parentIndex, childIndex } = props;
        if (!info.isGet) {
          emit("confirm", parentIndex, childIndex);
        }
      },
    });
    return {
      ...toRefs(methods),
    };
  },
});
</script>

<style lang="less" scoped>
.item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 30rpx 27rpx 30rpx 35rpx;
  margin-top: 20rpx;
  background: #fff;
  border-radius: 12rpx;
  box-sizing: border-box;
  box-shadow: 0 4rpx 11rpx 0 rgba(44, 93, 88, 0.06);
  .circle {
    width: 98rpx;
    height: 98rpx;
    margin-right: 19rpx;
    border-radius: 50%;
  }
  .label {
    display: flex;
    align-items: center;
    flex: 1;
    font-size: 30rpx;
    color: #333333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-button {
    margin-left: 19rpx;
    padding: 8rpx 21rpx 8rpx 25rpx;
    color: #ff7f00;
    line-height: 1;
    border: 2rpx solid #ff7f00;
    border-radius: 28rpx;
    &.disable {
      border-color: #999999;
      color: #999999;
    }
  }
}
</style>