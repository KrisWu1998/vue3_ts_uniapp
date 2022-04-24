<template>
  <view class="content-box">
    <Top />
    <Popup />
  </view>
</template>

<script>
import { defineComponent } from 'vue'
import Top from '@/components/index/top.vue';
import Popup from '@/components/index/popup.vue';
export default defineComponent({
  components: {
    Top,
    Popup
  },
  setup() {
    
  },
})
</script>

<style lang="less" scoped>
.content-box {
  position: relative;
  z-index: 999;
  width: 100%;
  padding-top: 718rpx;
}
</style>
