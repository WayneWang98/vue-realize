import vnode from './vnode'

// 低配版 h 函数，不实现参数的重载，只关心当且仅当三个参数同时存在的情况（必须接收三个参数）
/* 
只能以下面三种形态调用：

1. h('div', {}, '文字')
2. h('div', {}, [])
3. h('div', {}, h())
*/
export default function (sel, data, c) {
  // 检查参数的个数
  if (arguments.length !== 3) {
    throw new Error('h函数只能传入3个参数')
  }
  if (typeof c === 'string' || typeof c === 'number') {
    // 说明现在调用h函数是形态1
    return vnode(sel, data, undefined, c, undefined)
  } else if (Array.isArray(c)) { // 说明是形态2
    let children = []
    for (let i = 0; i < c.length; i ++) { // c[i]一定是h函数执行之后返回的对象
      if (!(typeof c[i] === 'object' && c[i].hasOwnProperty('sel'))) {
        throw new Error('传入的数组参数中，某些项不是h函数')
      }
      // 此时只需要收集children即可
      children.push(c[i])
    }
    // 循环结束了，就说明children数组收集完毕了，此时可以返回虚拟节点了
    return vnode(sel, data, children, undefined, undefined)
  } else if (typeof c === 'object' && c.hasOwnProperty('sel')) { // 说明是形态3
    let children = [c]
    return vnode(sel, data, children, undefined, undefined)
  } else {
    throw new Error('h函数传入的参数有误')
  }
}