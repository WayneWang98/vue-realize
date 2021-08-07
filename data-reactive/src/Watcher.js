import Dep from "./Dep"


let uid = 0

export default class Watcher {
  constructor (target, expression, callback) {
    this.id = uid ++
    this.target = target
    this.getter = parsePath(expression)
    this.callback = callback
    this.value = this.get()
  }

  update () {
    this.run()
  }

  get () {
    // 进入依赖收集阶段，让全局的Dep.target设置为watcher本身
    Dep.target = this
    const obj = this.target
    let value
    try {
      value = this.getter(obj)
    } catch (error) {

    } finally {
      Dep.target = null // 退出依赖收集阶段
    }
    return value
  }

  run () {
    this.getAndInvoke(this.callback)
  }

  // 得到并唤起
  getAndInvoke (cb) {
    const value = this.get()
    if (value !== this.value || typeof value === 'object') {
      const oldValue = this.value
      this.value = value
      cb.call(this.target, value, oldValue)
    }
  }
}

// 解析类似'a.b.c.d'这样子的字符串，并返回它的值
function parsePath (str) {
  let segments = str.split('.')
  return (obj) => {
    for (let i = 0; i < segments.length; i ++) {
      if (!obj) {
        return
      }
      obj = obj[segments[i]]
    }
    return obj
  }
}