class Singleton {
  constructor() {
    this._tasks = []
  }
  addTask(context) {
    this._tasks.push(context)
  }
  delTask(context) {
    const index = this.findIndex(context)
    if (index >= 0) {
      this._tasks.splice(index, 1)
    }
  }
  /**
   * 检测实例
   * @param {Object} context 实例
   * @param {Boolean} immediate 是否立即添加实例
   * @returns {Boolean} 实例不存在检测通过
   */
  access(context, immediate) {
    const isExist = this.findIndex(context) >= 0
    if (!isExist && immediate) {
      this.addTask(context)
    }
    return !isExist
  }
  // 实例索引
  findIndex(context) {
    return this._tasks.findIndex(r => r === context)
  }
}
/**
 * 单例
 * @param {Function} callback 回调函数
 * @param {Boolean} feedback 是否捕获异常
 * example: click: singleton(async function() {await a(); console.log(1)})
 */

function singleton(callback, feedback) {
  const s = new Singleton()
  return function() {
    const context = this
    const args = arguments
    return new Promise((resolve, reject) => {
      if (s.access(context, true)) {
        Promise.resolve(callback.apply(context, args))
          .then(res => {
            s.delTask(context)
            resolve(res)
          })
          .catch(err => {
            s.delTask(context)
            feedback && reject(err)
          })
        return true
      }
      feedback && reject('SINGLETON_PREVENT')
    })
  }
}

export default singleton
