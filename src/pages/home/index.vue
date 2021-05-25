<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view>
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<script>
import singleton from '@/common/singleton'
export default {
  data() {
    return {
      title: 'Home'
    }
  },
  onLoad() {
    // this.$store.dispatch('getUserInfo')
  },
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
