
import parseTemplateToTokens from './parseTemplateToTokens'
import renderTemplate from './renderTemplate'

window.TemplateEngine = {
  render (templateStr, data) {
    // 调用parseTemplateToTokens函数，让模板字符串能够变为tokens数组
    let tokens = parseTemplateToTokens(templateStr)
    // 调用renderTemplate函数，让tokens数组变为DOM字符串
    let domStr = renderTemplate(tokens, data)
    console.log(domStr)
    return domStr
  }
}