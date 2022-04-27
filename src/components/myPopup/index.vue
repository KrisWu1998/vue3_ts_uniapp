<template>
  <van-popup
    v-model:show="isShow"
    position="bottom"
    :style="{ height: '90%' }"
    round
  >
    <view class="myPopup-box">
      <view class="top">
        <view class="title">天天做任务赚翻租币</view>
        <view class="tips">
          已获得
          <text class="money">{{ moneyNum }}</text>
          个租币，租币可兑换商品
        </view>
        <view class="close" @click="handleClose">
          <view class="square"></view>
        </view>
      </view>
      <scroll-view class="content-wrap" scroll-y="true">
        <view v-for="(item, index) in list" :key="index" class="wrap-block">
          <view class="title">
            {{ item.label }}
          </view>
          <CardItem
            v-for="(childItem, childIndex) in item.child || []"
            :key="childIndex"
            :info="childItem"
            :parentIndex="index"
            :childIndex="childIndex"
            @confirm="setGetMoneyStatus"
          />
        </view>
      </scroll-view>
    </view>
  </van-popup>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import CardItem from "./cardItem.vue";
import { Toast } from "vant";
export default defineComponent({
  props: {
    isShow: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    CardItem,
  },
  setup(_, { emit }) {
    const state = reactive({
      moneyNum: 3347,
      list: [
        {
          label: "新人专属",
          child: [
            {
              color: "#72D0A0",
              label: "收藏人人租机小程序",
              isGet: true,
              addMoney: 10,
            },
            {
              color: "yellow",
              label: "进行实名认证",
              isGet: false,
              addMoney: 30,
            },
          ],
        },
        {
          label: "每天逛逛",
          child: [
            {
              color: "#72D0A0",
              label: "逛一逛活动也",
              isGet: false,
              addMoney: 10,
            },
            {
              color: "yellow",
              label: "逛一逛首页",
              isGet: false,
              addMoney: 30,
            },
            {
              color: "#72D0A0",
              label: "逛一逛生活号首页",
              isGet: false,
              addMoney: 10,
            },
            {
              color: "yellow",
              label: "去分享",
              isGet: false,
              addMoney: 5,
            },
          ],
        },
      ],
    });
    const methods = reactive({
      // 修改是否已领取金币状态
      setGetMoneyStatus(parantIndex: number, childIndex: number): void {
        state.list[parantIndex].child[childIndex].isGet = true;
        const currentData = state.list[parantIndex].child[childIndex];
        // this.props.onAddUserMoney(currentData.addMoney);
        emit("addUserMoney", currentData.addMoney);
        Toast.success({
          type: "success",
          message: `恭喜获得${currentData.addMoney}个租币!`,
          duration: 1000,
        });
      },
      // 关闭弹窗
      handleClose(): void {
        emit("confirm", false);
      },
    });
    return {
      ...toRefs(state),
      ...toRefs(methods),
    };
  },
});
</script>

<style lang="less" scoped>
.myPopup-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 32rpx 29rpx 22rpx 29rpx;
    color: #fff;
    background-image: linear-gradient(#7ad38c, #40cbbe);
    // border-top-left-radius: 48rpx;
    // border-top-right-radius: 48rpx;
    .title {
      margin-bottom: 10rpx;
      font-size: 42rpx;
      font-weight: bold;
    }
    .tips {
      font-size: 28rpx;
      .money {
        color: yellow;
        margin: 0 10rpx;
      }
    }
    .close {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 28rpx;
      right: 29rpx;
      width: 54rpx;
      height: 54rpx;
      border: 2rpx solid #fff;
      border-radius: 50%;
      .square {
        position: relative;
        width: 20rpx;
        height: 20rpx;
        transform: rotateZ(45deg);
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 50%;
          margin-top: -2rpx;
          margin-left: -2rpx;
          border-bottom: 4rpx solid #fff;
          border-right: 4rpx solid #fff;
        }
        &::before {
          content: "";
          position: absolute;
          bottom: 0;
          right: 0;
          width: 50%;
          height: 50%;
          margin-bottom: -2rpx;
          margin-right: -2rpx;
          border-top: 4rpx solid #fff;
          border-left: 4rpx solid #fff;
        }
      }
    }
  }
  .content-wrap {
    flex: 1;
    padding: 22rpx 24rpx 49rpx 24rpx;
    background: #e9faf4;
    overflow-y: scroll;
    /* white-space: nowrap; */
    box-sizing: border-box;
    .wrap-block {
      margin-top: 38rpx;
      &:nth-child(1) {
        margin-top: 0;
      }
      .title {
        font-size: 34rpx;
        font-weight: bold;
        color: #133c37;
        padding-left: 20rpx;
      }
    }
  }
}
</style>