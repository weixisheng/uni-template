<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view>
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'uni-template'
    }
  },
  onLoad() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  height: 400rpx;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 30rpx;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
