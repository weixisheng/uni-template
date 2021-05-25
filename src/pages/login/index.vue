<template>
  <view class="full-container">
    <view class="logo-container">
      <view class="input-box">
        <view class="input-item com-126 fs-lh-32 flex flex-middle border-bottom">
          <view class="item-left shrink-0 mr-10">手机号码</view>
          <view class="flex-1"><input v-model="sForm.Mobile" type="number" placeholder="请输入手机号" maxlength="11" /></view>
        </view>
        <view class="input-item com-126 fs-lh-32 flex flex-middle border-bottom">
          <view class="item-left shrink-0 mr-10">登录密码</view>
          <view class="flex-1"><input v-model="sForm.Pwd" type="password" placeholder="请输入登录密码" maxlength="6" /></view>
        </view>
      </view>
      <!-- <navigator url="./pass" hover-class="none" class="align-end mr-50">忘记密码？</navigator> -->
      <view class="btn-box"><view class="primary-btn round btn-small primary-active" @tap="submit">登录</view></view>
    </view>
  </view>
</template>

<script>
import { reg } from '@/common/regexp';
import { login } from '@http/api'
export default {
  name: 'Login',
  data() {
    return {
      sForm: {
        Mobile: '',
        Pwd: ''
      },
      btnLoading: false
    };
  },
  computed: {
    validMobile() {
      return reg.mobile(this.sForm.Mobile);
    },
    validPass() {
      return reg.code(this.sForm.Pwd);
    },
    validTag() {
      return this.validMobile && this.validPass;
    }
  },
  onLoad(options) {},
  methods: {
    submit() {
      if (!this.validTag) {
        return this.$msg('请输入正确的账号、密码');
      }
      if (this.btnLoading) {
        return;
      }
      this.btnLoading = true
      login(this.sForm).then(res => {
        this.btnLoading = false
        if (this.$ck(res, true, '请输入正确的账号、密码')) {
          let token = res.return_data.AuthToken
          uni.setStorageSync('token', token)
          uni.switchTab({
            url: '../home/index'
          })
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/style/variable.scss';
uni-page-body {
  height: 100%;
}
.logo-container {
  margin: 0 60rpx;
}
.btn-box {
  padding: 42rpx 0;
  .primary-btn {
    margin-top: 49rpx;
  }
}
.input-box {
  padding: 42rpx 0;
  .input-item {
    margin-left: 0;
    padding-right: 0;
  }
  .item-left {
    width: 150rpx;
  }
}

</style>
