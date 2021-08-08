import h from './mySnabbdom/h'
import patch from './mySnabbdom/patch'

const container = document.getElementById('container')
const btn = document.getElementById('btn')
const myVnode1 = h('ul', {}, [
  h('li', {}, 'A'),
  h('li', {}, 'B'),
  h('li', {}, 'C'),
  h('li', {}, 'D'),
  h('li', {}, [
    h('span', {}, 'span aaa'),
    h('span', {}, 'span bbb')
  ]),
])

// const myVnode1 = h('h1', {}, '你好')

patch(container, myVnode1)

const myVnode2 = h('section', {}, [
  h('h1', {}, '我是新的h1'),
  h('h2', {}, '我是新的h2')
])

btn.onclick = function () {
  patch(myVnode1, myVnode2)
}