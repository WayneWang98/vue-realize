import { def } from './utils'

// 得到Array.prototype
const arrayPrototype = Array.prototype

// 以Array.prototype为原型创建arrayMethods对象
export const arrayMethods = Object.create(arrayPrototype)

const methodsNeedChange = [ // 带*的三个方法比较特殊，要做处理
  'push', // *
  'pop',
  'shift',
  'unshift', // *
  'splice', // *
  'sort',
  'reverse'
]

methodsNeedChange.forEach(methodName => {
  // 备份原来的方法
  const original = arrayPrototype[methodName]
  
  // 定义新的方法
  def(arrayMethods, methodName, function () {
    const args = [...arguments]
    // 把这个数组的__ob__取出来，此时__ob__已经被添加了
    const ob = this.__ob__
    // 有三种方法：push、unshift、splice会插入新的项，现在要把插入的新项也要变为observe的
    let inserted = []
    switch (methodName) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }

    // 判断有没有要插入的新项
    if (inserted.length) { // 让这些新的项也变为响应式的
      ob.observeArray(inserted)
    }

    ob.dep.notify()
  
    const result = original.apply(this, arguments) // 执行原来的方法，并绑定执行的上下文，并返回数组方法执行之后的值
    return result
  }, false)
})