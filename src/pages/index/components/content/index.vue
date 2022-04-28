<template>
  <view class="content-box">
    <!-- 背面打底 (走路赚租币) 图标 -->
    <Top ref="top" @confirm="handleChangePopupStatus" />

    <!-- 内容区滑块 -->
    <Popup />

    <!-- 租币领取任务 -->
    <MyPopup
      :isShow="isShow"
      @addUserMoney="addUserMoney"
      @confirm="handleChangePopupStatus"
    />
  </view>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, reactive, toRefs } from "vue";
import Top from "@/components/index/top.vue";
import Popup from "@/components/index/popup.vue";
import MyPopup from "@/components/myPopup";
export default defineComponent({
  components: {
    Top,
    Popup,
    MyPopup,
  },
  setup() {
    // 获取top Dom
    const top = ref(null);

    // state数据汇总
    const state = reactive({
      isShow: false,
    });

    // 方法操作汇总
    const methods = reactive({
      addUserMoney(newMoney: number): void {
        const topDom = (top as any).value;
        topDom?.updateMoney(newMoney);
      },
      handleChangePopupStatus(flag: Boolean = true): void {
        (state as any).isShow = flag;
      },
    });
    return {
      top,
      ...toRefs(state),
      ...toRefs(methods),
    };
  },
});
</script>

<style lang="less" scoped>
.content-box {
  position: relative;
  z-index: 999;
  width: 100%;
  padding-top: 718rpx;
}
</style>
