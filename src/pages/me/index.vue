<template>
  <view>
    <!-- #ifdef MP -->
    <view class="flex flex-middle flex-column">
      <view class="user-avatar">
        <open-data type="userAvatarUrl"></open-data>
      </view>
      <view class="user-name mt-30">
        <open-data type="userNickName" lang="zh_CN"></open-data>
      </view>
    </view>
    <!-- #endif -->
  </view>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Me',
  data() {
    return {}
  },
  computed: {
    ...mapState(['userInfo'])
  },
  onLoad(options) {
    this.$store.dispatch('getUserInfo')
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
.user-avatar {
  overflow: hidden;
  margin-top: 200rpx;
  @include wh(200rpx);
  @include round;
}
.user-name {
  font-size: 36rpx;
}
</style>
