<template>
  <view class="exchangeBlock-box">
    <!-- 兑换商城 标题栏 -->
    <view class="exchangeBlock-top">
      <view class="exchangeBlock-top-left">
        兑换商城
        <image
          mode="aspectFit"
          src="/static/doubt-gray.png"
          style="width: 30rpx; height: 30rpx; margin-left: 8rpx"
        />
      </view>
      <view class="exchangeBlock-top-right">
        兑换记录
        <image
          mode="aspectFit"
          src="/static/arrows-right.png"
          style="width: 20rpx; height: 20rpx; margin-left: 8rpx"
        />
      </view>
    </view>

    <!-- 价格区间 选项卡 -->
    <scroll-view class="exchangeBlock-mid" :scroll-x="true">
      <view
        v-for="(item, index) in priceTabs"
        :key="index"
        :class="[
          `price-tabsItem ${index === activePriceIndex ? 'active' : ''}`,
        ]"
      >
        {{ item.label }}
      </view>
    </scroll-view>

    <!-- 商品列表 -->
    <view class="exchangeBlock-bottom">
      <view
        v-for="(shopItem, index) in moneyList"
        :key="index"
        class="exchangeBlock-shopItem-card"
      >
        <view class="shopItem-card-imgBlock">
          <image
            mode="aspectFit"
            :src="shopItem.cover"
            style="width: 335rpx; height: 272rpx"
          />
          <view class="tags" v-if="shopItem.tags">
            {{ shopItem.tags }}
          </view>
        </view>
        <view class="shopItem-car-bottom">
          <view class="label">{{ shopItem.title }}</view>
          <view class="groupMoney">
            {{ shopItem.need_coin }}租币 + {{ shopItem.need_pay }}元
          </view>
          <view class="case">
            <text class="case_nonMoney"> {{ shopItem.price }}元 </text>
            <text> 已兑{{ shopItem.total_num }}件 </text>
          </view>
        </view>
      </view>
    </view>

    <!-- 赚取更多租币 -->
    <view class="addMore-wrap">
      <view class="addMore-button">
        赚取更多租币
        <image
          mode="aspectFit"
          src="/static/arrows-right-orange.png"
          style="width: 20rpx; height: 20rpx; margin-left: 8rpx"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  props: {
    moneyList: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const state = reactive({
      activePriceIndex: 0,
      priceTabs: [
        {
          label: "全部",
          min: 0,
          max: 99999,
        },
        {
          label: "1-100",
          min: 1,
          max: 100,
        },
        {
          label: "100-500",
          min: 100,
          max: 500,
        },
        {
          label: "500-5000",
          min: 500,
          max: 5000,
        },
        {
          label: "5000以上",
          min: 5000,
          max: 99999,
        },
      ],
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="less" scoped>
.exchangeBlock-box {
  height: 60%;
  padding: 41rpx 30rpx;
  background: rgba(255, 255, 255, 0.5);
  border-top-left-radius: 40rpx;
  border-top-right-radius: 40rpx;
  box-sizing: border-box;
  .exchangeBlock-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 44rpx;
    .exchangeBlock-top-left {
      display: inline-flex;
      align-items: center;
      font-size: 32rpx;
      color: #222222;
    }
    .exchangeBlock-top-right {
      display: inline-flex;
      align-items: center;
      font-size: 28rpx;
      color: #999999;
    }
  }
  .exchangeBlock-mid {
    width: 100%;
    padding-bottom: 10rpx;
    white-space: nowrap;
    .price-tabsItem {
      display: inline-block;
      padding: 10rpx 20rpx;
      margin-right: 16rpx;
      font-size: 24rpx;
      font-weight: bold;
      color: #999;
      border: 2rpx solid #e6e6e6;
      border-radius: 22rpx;
      &:nth-last-child(1) {
        margin-right: 0;
      }
      &.active {
        color: #ff6737;
        background: rgba(255, 103, 55, 0.2);
        border: none;
      }
    }
  }
  .exchangeBlock-bottom {
    display: flex;
    flex-wrap: wrap;
    padding-top: 22rpx;
    .exchangeBlock-shopItem-card {
      display: inline-block;
      width: 335rpx;
      margin: 0 19rpx 16rpx 0;
      &:nth-child(2n) {
        margin-right: 0;
      }
      .shopItem-card-imgBlock {
        position: relative;
        width: 335rpx;
        height: 272rpx;
        .tags {
          position: absolute;
          top: 24rpx;
          right: 15rpx;
          padding: 6rpx 12rpx;
          font-size: 22rpx;
          color: #fff;
          background-image: linear-gradient(#ff9a3c, #ff611c);
          border-radius: 4rpx;
        }
      }
      .shopItem-car-bottom {
        padding: 10rpx 11rpx 24rpx 20rpx;
        background: #fff;
        .label {
          margin-bottom: 16rpx;
          font-size: 28rpx;
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .groupMoney {
          margin-bottom: 16rpx;
          font-size: 28rpx;
          color: #ff6737;
        }
        .case {
          font-size: 24rpx;
          color: #999;
          .case_nonMoney {
            margin-right: 10rpx;
            text-decoration: line-through;
          }
        }
      }
    }
  }
  .addMore-wrap {
    display: flex;
    justify-content: center;
    margin-top: 14rpx;
    padding-bottom: 10rpx;
    .addMore-button {
      padding: 17rpx 30rpx;
      font-size: 28rpx;
      color: #ff6737;
      border: 2rpx solid #ff6737;
      border-radius: 30.5rpx;
    }
  }
}
</style>
