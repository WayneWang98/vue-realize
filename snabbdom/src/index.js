import h from './mySnabbdom/h'
import patch from './mySnabbdom/patch'

const container = document.getElementById('container')
const btn = document.getElementById('btn')
const myVnode1 = h('ul', {}, [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'E' }, 'E')
])
const myVnode2 = h('ul', {}, [
  h('li', { key: 'Q' }, 'Q'),
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'E' }, 'E')
])
// const myVnode2 = h('ul', {}, [
//   h('li', { key: 'E' }, 'E'),
//   h('li', { key: 'D' }, 'D'),
//   h('li', { key: 'C' }, 'C'),
//   h('li', { key: 'B' }, 'B'),
//   h('li', { key: 'A' }, 'A'),
// ])
// const myVnode2 = h('ul', {}, [
//   // h('li', { key: 'A' }, 'A'),
//   // h('li', { key: 'B' }, 'B'),
//   h('li', { key: 'C' }, 'CCC'),
//   // h('li', { key: 'D' }, 'D'),
//   // h('li', { key: 'E' }, 'E')
// ])

// const myVnode1 = h('h1', {}, '你好')

patch(container, myVnode1)



btn.onclick = function () {
  patch(myVnode1, myVnode2)
}