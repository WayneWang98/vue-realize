import patchVnode from './patchVnode'
import createElement from './createElement'

// 判断是否是同一个虚拟节点
function checkSameVnode (a, b) {
  return a.sel === b.sel && a.key === b.key
}

/* 
  4种命中方式实现最小量更新
*/

export default function updateChildren (parentElm, oldCh, newCh) {
  // 定义4个指针
  let oldStartIdx = 0 // 旧前
  let newStartIdx = 0 // 新前
  let oldEndIdx = oldCh.length - 1 // 旧后
  let newEndIdx = newCh.length - 1 // 新后

  let oldStartVnode = oldCh[0] // 旧前节点
  let oldEndVnode = oldCh[oldEndIdx] // 旧后节点
  let newStartVnode = newCh[0] // 新前节点
  let newEndVnode = newCh[newEndIdx] // 新后节点

  let keyMap = null // key与i的映射缓存

  // 开始循环遍历，循环体内进行4种命中方式的查找
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 首先不是判断命中，而是要略过已经加了undefined标记的节点
    if (oldStartVnode === undefined) {
      oldStartVnode = oldCh[++ oldStartIdx]
    } else if (oldEndVnode === undefined) {
      oldEndVnode = oldCh[-- oldEndtIdx]
    } else if (newStartVnode == undefined) {
      newStartVnode = newCh[++ newStartIdx]
    } else if (oldStartVnode == undefined) {
      newEndVnode = newCh[-- newEndIdx]
    }

    if (checkSameVnode(oldStartVnode, newStartVnode)) { // 新前和旧前
      patchVnode(oldStartVnode, newStartVnode)
      oldStartVnode = oldCh[++ oldStartIdx]
      newStartVnode = newCh[++ newStartIdx]
    } else if (checkSameVnode(newEndVnode, oldEndVnode)) { // 新后和旧后
      patchVnode(oldEndVnode, newEndVnode)
      oldEndVnode = oldCh[-- oldEndIdx]
      newEndVnode = newCh[-- newEndIdx]
    } else if (checkSameVnode(newEndVnode, oldStartVnode)) { // 新后和旧前
      patchVnode(oldStartVnode, newEndVnode)
      // 当3命中时，此时要移动节点，移动旧前指向的这个节点到老节点的旧后的后面
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
      oldStartVnode = oldCh[++ oldStartIdx]
      newEndVnode = newCh[-- newEndIdx]
    } else if (checkSameVnode(newStartVnode, oldEndVnode)) { // 新前和旧后
      patchVnode(oldEndVnode, newStartVnode)
      // 当4命中时，此时要移动节点，移动新前指向的这个节点到老节点的旧前的前面
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[-- oldEndIdx]
      newStartVnode = newCh[++ newStartIdx]
    } else { // 都没有找到的情况
      if (!keyMap) {
        keyMap = {}
        for (let i = oldStartIdx; i <= oldEndIdx; i ++) {
          const key = oldCh[i].key
          if (key !== undefined) {
            keyMap[key] = i
          }
        }
      }
      // 寻找当前这项（newStartIdx）在keyMap种映射的位置
      const idxInOld = keyMap[newStartVnode.key]
      // 判断，如果idxInOld为undefined，就表示它是全新的项，只需要插入即可
      if (idxInOld === undefined) {
        parentElm.elm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
      } else { // 不是全新的项，需要移动，移动到oldStartIdx之前
        const elmToMove = oldCh[idxInOld]
        if (elmToMove) {
          patchVnode(elmToMove, newStartVnode)
          // 把这项设置为undefined，表示已经处理完成了
          oldCh[idxInOld] = undefined
          parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
        }
      }
      newStartVnode = newCh[++ newStartIdx] // 移动新前指针
    }
  }
  // 循环结束之后看看有没有剩的节点
  if (newStartIdx <= newEndIdx) {
    // 遍历新的newCh，添加到老的没有处理的节点之前
    for (let i = newStartIdx; i <= newEndIdx; i ++) {
      parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm)
    }
  } else if (oldStartIdx <= oldEndIdx) {
    // 批量删除oldStartIdx 和 oldEndIdx之间的项
    for (let i = oldStartIdx; i <= oldEndIdx; i ++) {
      if (oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm)
      }
    }
  }
}