<template>
  <view class="empty">
  <image 
    mode="aspectFit"
    src="../../static/empty.png"
    class="empty-imgae"
  />
  <view class="empty-content">
    暂无消息
  </view>
</view>
</template>

<style lang="less" scoped>
.empty {
  width: 100%;
  padding: 100rpx 215rpx 0 215rpx;
  box-sizing: border-box;
  .empty-imgae {
    width: 320rpx;
    height: 320rpx;
  }
  .empty-content {
    width: 100%;
    font-size: 32rpx;
    color: #999999;
    text-align: center;
  }
}
</style>