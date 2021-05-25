export const reg = {
  empty: v => /^\s*$/g.test(v),
  mobile: v => /^1\d{10}$/.test(v),
  telephone: v => /^((0\d{2,3}-\d{4,7})|(1\d{10}))$/.test(v),
  code: v => /^\d{6}$/.test(v),
  price: v => /^([1-9]\d*|0)(\.\d{1,2})?$/.test(v),
  wxNum: v => /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/.test(v),
  doubleByte: v => /[^\x00-\xff]/.test(v)
}

export const msg = {
  mobile: '请输入正确的手机号',
  code: '请输入正确的验证码',
  price: '请输入0.01~999999.99',
  wxNum: '请输入正确的微信号'
}
