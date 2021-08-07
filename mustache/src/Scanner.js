export default class Scanner {
  constructor (templateStr) {
    this.templateStr = templateStr
    this.pos = 0
    this.tail = templateStr // 字符串的尾巴，初始时就是模板字符串的原文
  }

  // 跳过“{{” 或 “}}”，功能比较弱，没有返回值
  scan (tag) {
    if (this.tail.indexOf(tag) === 0) {
      // tag 有多长，比如{{长度是2，就让pos指针后移多少位
      this.pos += tag.length
      // 尾巴也要改变，从当前pos到结束
      this.tail = this.templateStr.substring(this.po)
    }
  }

  // 扫描到大括号之前停止，并收集扫描到的字符串，并返回
  scanUntil (stopTag) {
    // 记录一下执行本方法的时候的pos值
    const posBackup = this.pos

    // 当尾巴的开头不是stopTag的时候，就说明还没有扫描到stopTag
    while (!this.eos() && this.tail.indexOf(stopTag) !== 0) {
      this.pos ++
      // 改变尾巴为从当前指针开始，到最后的全部字符
      this.tail = this.templateStr.substr(this.pos) // 截取包括pos在内的这一位
    }
    return this.templateStr.substring(posBackup, this.pos) // 返回扫描路径上的字符串
  }

  // 判断指针是否已经到头，返回一个布尔值(true表示到头)
  eos () { // end of string
    return this.pos >= this.templateStr.length
  }
}