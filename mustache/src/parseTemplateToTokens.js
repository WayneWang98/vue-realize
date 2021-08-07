import Scanner from './Scanner'
import nestTokens from './nestTokens'

/*
  把scanner扫描出来的模板字符串组装成tokens数组
*/
export default function parseTemplateToTokens (templateStr) {
  let tokens = []

  // 创建扫描器
  let scanner = new Scanner(templateStr)
  let words = ''
  while (!scanner.eos()) {
    // 收集开始标记出现之前的所有文字
    words = scanner.scanUntil('{{')
    if (words !== '') {
      let isInJJH = false // 是否是尖角号中的空格，如果是，需要去掉
      let _words = ''
      for (let i = 0; i < words.length; i ++) {
        if (words[i] === '<') {
          isInJJH = true
        } else if (words[i] === '>') {
          isInJJH = false
        }
        // 如果这项不是空格，那么就拼接上
        if (!/\s/.test(words[i])) {
          _words += words[i]
        } else {
          if (isInJJH) { // 如果这一项是空格，只有当它在标签内的时候，才拼接上
            _words += ' '
          }
        }
      }
      tokens.push(['text', _words])
    }
    
    scanner.scan('{{')
    words = scanner.scanUntil('}}')
    if (words !== '') {
      // 这个words就是双大括号之间的东西，需要判断一下它的首字符
      if (words[0] === '#') {
        tokens.push(['#', words.substring(1)]) // 从下标为1的项开始存
      } else if (words[0] === '/') {
        tokens.push(['/', words.substring(1)]) // 从下标为1的项开始存
      } else {
        tokens.push(['name', words])
      }
    }
    scanner.scan('}}')
  }

  return nestTokens(tokens)
}