import { BASE_URL } from '@/config'
export const authLogin = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const [, data] = await uni.login()
    uni
      .request({
        url: `${BASE_URL}/Login/Auth`,
        method: 'POST',
        data: { Code: data.code },
        header: {
          'content-type': 'application/json'
        }
      })
      .then(([, res]) => {
        const { return_code, return_data, return_msg } = res.data
        const token = return_data.AuthToken
        if (return_code === '0') {
          uni.setStorageSync('token', token)
          resolve()
        } else reject(`auth: ${return_msg}`)
      })
  })
}
