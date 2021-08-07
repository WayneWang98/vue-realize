// 创建observe函数（辅助判别函数）

import Observer from './Observer'

export const observe = function (value) {
  // 如果value不是对象，则什么都不需要做，observe函数只为对象服务
  if (typeof value !== 'object') return

  let ob
  if (value.__ob__ !== undefined) {
    ob = value.__ob__ //  __ob__用来存储Observer的实例
  } else {
    ob = new Observer(value)
  }
  return ob
}