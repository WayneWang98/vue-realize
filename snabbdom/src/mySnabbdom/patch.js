import vnode from './vnode'
import createElement from './createElement'

export default function patch (oldVnode, newVnode) {
  // 判断oldVnode是DOM节点还是虚拟DOM
  if (oldVnode.sel === '' || oldVnode.sel === undefined) {
    // oldVnode为DOM节点，要把它包装成虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }
  
  // 判断oldVnode和newVnode是否为同一个节点（key和sel都相等）
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    // 是同一个节点，进行精细化比较
  } else {
    // 不是同一个节点，暴力：先插入新的，再删除旧的（如果顺序相反，则找不到标杆，导致无法删除）
    let newVnodeElm = createElement(newVnode)
    // 插入到老节点之前
    if (oldVnode.elm && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    }
    // 删除老节点
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }
}