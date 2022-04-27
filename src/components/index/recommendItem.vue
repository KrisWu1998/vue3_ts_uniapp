<template>
  <view :class="['item', index % 2 !== 0 ? 'reset-mr' : '']">
    <image class="img" :src="data.url" alt="商品图" />
    <view class="item-bottom">
      <view class="title">{{ data?.title || "正在获取中..." }}</view>
      <view class="tags">{{ data?.tags }}</view>
      <view class="base">
        <view class="money">{{ data.money ? `￥${data.money}/天` : "" }}</view>
        <view class="day">{{ data.day ? `${data.day}天起租` : "" }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  /*
   * props
   *  data => 商品数据, index => 循环索引
   */
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  setup() {},
});
</script>

<style lang="less" scoped>
.item {
  width: 340rpx;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  background: #fff;
  &.reset-mr {
    margin-right: 0;
  }
  .img {
    width: 100%;
    height: 300rpx;
  }
  .item-bottom {
    padding: 0 20rpx 10rpx 17rpx;
    .title {
      font-size: 30rpx;
      color: #333333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .tags {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 84rpx;
      height: 32rpx;
      margin-bottom: 10rpx;
      font-size: 22rpx;
      color: #00c8be;
      border: 2rpx solid #00c8be;
      border-radius: 4rpx;
    }
    .base {
      display: flex;
      justify-content: space-between;
      font-size: 24rpx;
      .money {
        color: #f04f4f;
      }
      .day {
        color: #aaaaaa;
      }
    }
  }
}
</style>