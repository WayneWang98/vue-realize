import { observe } from './observe'
import Dep from './Dep'

export default function defineReactive (data, key, val) { // 通过闭包的形式对val变量进行中转
  const dep = new Dep() // 闭包中的dep

  // console.log('我是defineReactive', data, key)
  if (arguments.length === 2) {
    val = data[key]
  }

  let childObj = observe(val) // 子元素也要observe，至此形成了递归：observe -> Observer -> defineReactive -> observe

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    
    get () {
      // console.log('触发了get', val)
      // 如果现在处于依赖收集阶段
      if (Dep.target) {
        dep.depend()
        if (childObj) {
          childObj.dep.depend()
        }
      }
      return val
    },
    set (newVal) {
      // console.log('触发了set', newVal)
      if (val === newVal) {
        return
      }
      val = newVal
      childObj = observe(newVal) // 当我们设置了新值时，新值也要被observe，因为新值可能又是一个对象
      // 发布订阅模式
      dep.notify()
    }
  })
}