/* 
  在data对象中，可以用连续点符号寻找keyName
*/

export default function lookup (dataObj, keyName) {
  // 看看keyName中有没有点符号，但是不能是点符号本身
  if (keyName.indexOf('.') !== -1 && keyName != '.') {
    let keys = keyName.split('.')
    let temp = dataObj
    for (let i = 0; i < keys.length; i ++) {
      temp = temp[keys[i]]
    }
    return temp
  }
  // 如果没有点符号
  return dataObj[keyName]
}