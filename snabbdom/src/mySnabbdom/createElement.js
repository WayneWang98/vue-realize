/* 
  真正用来创建节点的函数
  将vnode变为DOM节点，是孤儿节点，不进行插入
*/

export default function createElement (vnode) {
  // 把虚拟节点vnode插入到pivot DOM节点之前
  let domNode = document.createElement(vnode.sel) // 现在是孤儿节点，需要上树
  // 有子节点还是有文本？
  if (vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
    domNode.innerText = vnode.text
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 这个vnode内部有子节点，需要递归创建子节点
    for (let i = 0; i < vnode.children.length; i ++) {
      // 得到当前这个children
      let ch = vnode.children[i]
      let chDOM = createElement(ch) // 创建子节点，并添加到上一层vnode.elm元素中
      domNode.appendChild(chDOM)
    }
  }
  // 补充elm属性
  vnode.elm = domNode

  return vnode.elm
}