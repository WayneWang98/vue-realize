

import { observe } from './observe'
import Watcher from './Watcher'

let obj = {
  a: {
    m: {
      n: 5
    }
  },
  b: 10,
  c: {
    d: {
      e: {
        f: 666
      }
    }
  },
  g: [22, 33, 44, 55]
}

observe(obj)
// obj.g.splice(2, 1, [88, 99])
// console.log(obj)
new Watcher(obj, 'a.m.n', function () {
  console.log('Watcher的回调执行成功')
})
obj.a.m.n = 88
console.log(obj)