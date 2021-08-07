// 折叠tokens

// 将 # 和 / 之间的tokens能够整合起来，作为它下标为2的项
export default function nestTokens (tokens) {
  let nestedTokens = [] // 结果数组
  // 栈结构，存放小的tokens，栈顶的tokens数组中当前操作的这个tokens小数组
  let sections = []
  // 收集器（利用了js中引用类型的特性）
  let collector = nestedTokens

  for (let i = 0; i < tokens.length; i ++) {
    let token = tokens[i]
    switch (token[0]) {
      case '#':
        collector.push(token) // 往收集器中放入这个token
        sections.push(token)
        // 更换收集器，指向token下标为2的项
        collector = token[2] = []
        break
      case '/':
        sections.pop()
        // 改变收集器为栈顶下标为2的数组
        collector = sections.length > 0 ? sections[sections.length - 1][2] : nestedTokens
        break
      default :
        collector.push(token)
        break
    }
  }

  return nestedTokens
}