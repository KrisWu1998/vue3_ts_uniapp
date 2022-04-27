<template>
  <view class="shop-box">
    <van-pull-refresh
      v-model="loading"
      @refresh="onRefresh"
      class="content-pull-box"
    >
      <shop-user-info-block :userInfo="userInfo" />
      <shop-money-list-block v-model:moneyList="moneyList" />
    </van-pull-refresh>
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
// 数据引入
import useUserInfo from "./composables/userInfo";
import userMoneyList from "./composables/money-list";
import { ShopSteupData } from "./data";
// 组件引入
import shopUserInfoBlock from "./components/user-info-block.vue";
import shopMoneyListBlock from "./components/money-list-block.vue";
// api
import { getShopData } from "./server";
// vant
import { Toast } from "vant";
export default defineComponent({
  components: {
    shopUserInfoBlock,
    shopMoneyListBlock,
  },

  setup(): ShopSteupData {
    const { userInfo } = useUserInfo();
    const { moneyList, baseCoverUrl } = userMoneyList();

    // 页面下拉加载loading
    const state = reactive({
      loading: false,
    });
    const methods = reactive({
      onRefresh() {
        setTimeout(() => {
          state.loading = false;
          getShopData().then((res) => {
            if (res.status === 0) {
              const data = res.data || {};
              const list = data.list || [];
              list.forEach((item: any) => (item.cover = baseCoverUrl));
              moneyList.value.push(...list);
              Toast.loading({
                type: "success",
                message: "刷新成功!",
                duration: 1000,
              });
            }
          });
        }, 1000);
      },
    });

    return {
      userInfo: userInfo.value,
      moneyList: moneyList.value,
      baseCoverUrl: baseCoverUrl.value,
      ...toRefs(state),
      ...toRefs(methods),
    };
  },
});
</script>

<style lang="less">
.shop-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: #f7f8f9;
  .content-pull-box {
    height: 100%;
  }
}
</style>
