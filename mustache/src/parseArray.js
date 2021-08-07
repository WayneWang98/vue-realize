import lookup from './lookup'
import renderTemplate from './renderTemplate'

/* 
  处理数组，结合renderTemplate实现递归 
  递归的次数由data决定  
*/

// 注意是token而不是tokens，如['#', 'students', []]
export default function parseArray (token, data) {
  let v = lookup(data, token[1])
  let resultStr = ''
  for (let i = 0; i < v.length; i ++) {
    // 这里要补一个点属性的识别
    resultStr += renderTemplate(token[2], {
      '.': v[i],
      ...v[i]
    })
  }
  return resultStr
}