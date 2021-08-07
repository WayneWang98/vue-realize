let uid = 0

export default class Dep {
  constructor () {
    this.id = uid ++
    // 用数组存储订阅者subscribe（Watcher的实例）
    this.subs = []
  }

  // 添加订阅
  addSub (sub) {
    this.subs.push(sub)
  }

  // 添加依赖
  depend () {
    if (Dep.target) { // Dep.target是我们自己指定的一个全局变量位置，全局唯一
      this.addSub(Dep.target) // 将watcher添加到subs中
    }
  }

  // 发布（通知）更新
  notify () {
    // console.log('我是notify')
    const subs = this.subs.slice()
    // 遍历
    for (let i = 0, l = subs.length; i < l; i ++) {
      subs[i].update()
    }
  }
}