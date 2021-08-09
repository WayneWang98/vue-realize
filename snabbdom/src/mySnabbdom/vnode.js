// 把传入的五个参数拼接成对象返回

export default function (sel, data, children, text, elm) {
  const key = data.key
  return {
    sel, data, children, text, elm, key
  }
}