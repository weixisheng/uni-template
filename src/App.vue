<script>
export default {
  onLaunch: function() {
    // #ifdef MP
    this.checkNetwork()
    this.checkUpdate()
    // #endif
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  },
  methods: {
    checkUpdate() {
      if (uni.canIUse('getUpdateManager')) {
        const updateManager = uni.getUpdateManager()
        updateManager.onCheckForUpdate(function(res) {
          // 请求完新版本信息的回调
          if (res.hasUpdate) {
            updateManager.onUpdateReady(function() {
              // 强制小程序重启并使用新版本
              updateManager.applyUpdate()
            })
            updateManager.onUpdateFailed(function() {
              // 新的版本下载失败
              uni.showModal({
                title: '已经有新版本了~',
                content: '新版本已经上线啦~ 请您删除当前小程序，重新搜索打开~'
              })
            })
          }
        })
      } else {
        // 如果希望用户在最新版本的客户端上体验您的小程序
        uni.showModal({
          title: '提示',
          content:
            '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
    },
    checkNetwork() {
      uni.onNetworkStatusChange(res => {
        if (!res.isConnected) {
          uni.showToast({
            title: '请检查你的网络',
            icon: 'none'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
@import './style/common.scss';
/* #ifdef H5 */
/* uni-page-head[uni-page-head-type='default'] ~ uni-page-wrapper {
  height: 100vh;
} */
/* 在page.json配置h5的titleNView为false即可不渲染导航栏 */
/* uni-page-head {
    display: none;
  } */
body {
  margin: auto !important;
}
/* #endif */
</style>
