/* 
  Observer类：
  将一个正常的object对象转换为每个层级的属性都是响应式（可以被侦测到的）的对象
*/

import { def } from './utils'
import defineReactive from './defineReactive'
import { arrayMethods } from './array'
import { observe } from './observe'
import Dep from './Dep'

export default class Observer {
  constructor (value) {
    this.dep = new Dep() // 每一个Observer的成员都有一个Dep的实例

    // 我们希望 __ob__ 是一个不可枚举的属性，所以这里调用def方法改变它的可枚举姓
    def(value, '__ob__', this, false) // 对value添加__ob__属性，其值为Observer的实例
    // 检查value是否是数组
    if (Array.isArray(value)) {
      // 如果是数组，要将数组的原型指向arrayMethods
      Object.setPrototypeOf(value, arrayMethods) // value.__proto__ === arrayMethods
      // 让这个数组变为响应式的
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  // 遍历value的每一个key，对他们做defineReactive操作
  walk (value) {
    for (let k in value) {
      defineReactive(value, k)
    }
  }

  // 数组的特殊遍历
  observeArray (arr) {
    for (let i = 0, l = arr.length; i < l; i ++) {
      // 逐项进行observe
      observe(arr[i])
    }
  }
}