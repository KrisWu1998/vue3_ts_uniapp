<template>
  <view class="top-box">
    <!-- 左侧 -->
    <view class="left">
      <view
        v-for="(item, index) in leftInfo"
        :key="index"
        :style="{ backgroundImage: getUrl(item.url) }"
        class="icon reset-img"
        @tap="handleGoMeesage"
      >
        <view class="tips" v-if="item.tipsNum">
          <text class="tips-text">{{ item.tipsNum }}</text>
        </view>
      </view>
    </view>
    <!-- 右侧 -->
    <view class="right">
      <view
        v-for="(item, index) in rightInfo"
        :key="index"
        @tap="handleTap(item, index)"
        class="tags-item"
      >
        <view
          :style="{ backgroundImage: getUrl(item.url) }"
          class="tags-item-left reset-img"
        />
        <text
          class="flex-alignt"
          :style="{ fontSize: item.isMoney ? '32rpx' : '22rpx' }"
        >
          {{ item.isMoney ? item.num : item.noSignIn ? "未签到" : "已签到" }}
        </text>
      </view>
    </view>
    <!-- 中间 -->
    <view class="mid">
      <view class="flotage-wrap">
        <view
          v-for="(item, index) in midInfo"
          :key="index"
          :style="{
            marginTop: getMargin(index, midInfo),
            marginRight: index + 1 === midInfo.length ? 0 : '34rpx',
          }"
          class="item"
        >
          {{ item.text }}
          <view
            :style="{ backgroundImage: getUrl(item.url) }"
            class="img reset-img"
          />
        </view>
      </view>
      <view class="mid-bottom">
        <view class="step-box">
          <view class="circle">
            <view class="flex-juest">今日步数</view>
            <view class="flex-juest setpNumber">{{ stepNumber }}</view>
            <view class="flex-juest">每日24:00自动清零</view>
          </view>
          <view class="partition-button" @click="handleGoShop">
            {{ `瓜分${money}现金` }}
          </view>
          <view class="boy reset-img" />
          <view class="girl reset-img" />
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  setup(_, { emit }) {
    const state = reactive({
      leftInfo: [
        {
          url: "../../static/msg.png",
          tipsNum: 12,
        },
        {
          url: "../../static/rule.png",
          tipsNum: 2,
        },
      ],
      rightInfo: [
        {
          url: "../../static/money.png",
          isMoney: true,
          num: 32,
        },
        {
          url: "../../static/signIn.png",
          isSign: true,
          noSignIn: false,
        },
      ],
      midInfo: [
        {
          url: "../../static/addMoney.png",
          text: "支付成功",
        },
        {
          url: "../../static/addMoney.png",
          text: "支付成功",
        },
        {
          url: "../../static/addMoney.png",
          text: "运动步数",
        },
        {
          url: "../../static/addMoney_new.png",
          text: "新人专享",
        },
        {
          url: "../../static/addMoney.png",
          text: "运动步数",
        },
      ],
      money: 888,
      stepNumber: 2748,
    });
    const methods = reactive({
      getUrl(url: string) {
        return `url(${new URL(url, import.meta.url).href})`;
      },
      handleTap(item: Object, index: number): void {
        if (item.isSign) {
          // 签到切换
          const flag = state.rightInfo[index].noSignIn;
          state.rightInfo[index].noSignIn = !flag;
        } else {
          // 查看获取金币任务
          emit("confirm");
        }
      },
      getMargin(index: number, list: Array<any>): any {
        const len = list.length;
        if (index === 0 || index + 1 === len) return "72rpx";
        if (index === 2) return "14rpx";
        return 0;
      },
      updateMoney(newNum: number): void {
        const oldNum = (state.rightInfo as any[])[0].num;
        state.rightInfo[0].num = oldNum + newNum;
      },
      handleGoMeesage(): void {
        uni.navigateTo({
          url: "/pages/myMessage/myMessage",
        });
      },
      handleGoShop() {
        uni.navigateTo({
          url: "/pages/shop/shop",
        });
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
.top-box {
  position: absolute;
  top: 0;
  width: 100%;
  height: 718rpx;
  .left {
    display: inline-flex;
    flex-direction: column;
    position: fixed;
    top: 30rpx;
    left: 20rpx;
    .icon {
      position: relative;
      width: 56rpx;
      height: 72rpx;
      margin-top: 18rpx;
      :nth-child(1) {
        margin-top: 0;
      }
      .tips {
        position: absolute;
        top: -10rpx;
        right: -10rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 24rpx;
        height: 24rpx;
        font-size: 16rpx;
        color: #fff;
        background: #ff876a;
        border: 2rpx solid #fff;
        border-radius: 50%;
        .tips-text {
          transform: scale(0.8);
        }
      }
    }
  }
  .right {
    display: inline-flex;
    flex-direction: column;
    position: fixed;
    top: 40rpx;
    right: 0;
    min-width: 140rpx;
    .tags-item {
      display: inline-flex;
      min-width: 100%;
      margin-bottom: 24rpx;
      padding: 6rpx 10rpx;
      color: #027c64;
      font-weight: bold;
      background: rgba(255, 255, 255, 0.7);
      border-top-left-radius: 27rpx;
      border-bottom-left-radius: 27rpx;
      :nth-child(1) {
        margin-bottom: 0;
      }
      .tags-item-left {
        width: 48rpx;
        height: 48rpx;
        margin-right: 6rpx;
      }
    }
  }
  .mid {
    position: fixed;
    top: 185rpx;
    width: 100%;
    min-height: calc(718rpx - 185rpx);
    .flotage-wrap {
      display: flex;
      justify-content: center;
      position: absolute;
      top: 0;
      width: 100%;
      .item {
        display: inline-flex;
        flex-direction: column;
        font-size: 22rpx;
        font-weight: bold;
        color: #105b50;
        .img {
          width: 96rpx;
          height: 96rpx;
          margin-top: 10rpx;
        }
      }
    }
    .mid-bottom {
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 35rpx;
      z-index: 2;
      width: 100%;
      height: 330rpx;
      .step-box {
        display: flex;
        justify-content: center;
        position: relative;
        width: 450rpx;
        // height: 330rpx;
        .circle {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 330rpx;
          height: 330rpx;
          padding-top: 40rpx;
          padding-bottom: 119rpx;
          font-size: 24rpx;
          color: #999999;
          background-image: linear-gradient(
            rgba(255, 255, 255, 1),
            rgba(255, 255, 255, 0.7)
          );
          border-radius: 50%;
          box-sizing: border-box;
          .setpNumber {
            font-size: 80rpx;
            color: #084f3e;
          }
        }
        .partition-button {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          bottom: 0;
          // width: 450rpx;
          padding: 24rpx 109rpx;
          font-size: 38rpx;
          color: #fff;
          background-image: linear-gradient(#fa5721, #ffa901);
          border-radius: 50rpx;
          box-sizing: border-box;
        }
        .boy {
          position: absolute;
          left: 60rpx;
          bottom: 100rpx;
          width: 45rpx;
          height: 124rpx;
          background-image: url("@/static/boy.png");
        }
        .girl {
          position: absolute;
          right: 42rpx;
          bottom: 100rpx;
          width: 76rpx;
          height: 104rpx;
          background-image: url("@/static/girl.png");
        }
      }
    }
  }
}
.reset-img {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
}
.flex-alignt {
  display: inline-flex;
  align-items: center;
}
.flex-juest {
  display: flex;
  justify-content: center;
}
</style>
