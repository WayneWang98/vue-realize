import updateChildren from './updateChildren'

// 对比同一个虚拟节点
export default function patchVnode (oldVnode, newVnode) {
  if (oldVnode === newVnode) { // 判断新旧vnode是否是同一个对象（在内存中是否指向同一地址）
    return // 什么都不需要做
  }
  if (newVnode.text !== undefined 
    && (newVnode.children === undefined || newVnode.children.length === 0)) { // newVnode有text属性
      console.log('新vnode有text属性')
      if (newVnode.text !== oldVnode.text) { // 新旧vnode的text不相同，直接赋值即可
        oldVnode.elm.innerText = newVnode.text
      }
  } else { // newVnode没有text属性
    console.log('新vnode没有text属性')
    if (oldVnode.children !== undefined && oldVnode.children.length > 0) { // 此时新老vnode都有children
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
    } else { // oldVnode没有children，newVnode有children
      let dom = createElement(newVnode)
      oldVnode.elm.innerText = ''
      oldVnode.elm.appendChild(dom)
    }
  }
}