// todo: support export all single module and default whole module like react
import { createIntersection, init } from '@monitor-fe/core'

init({
  appId: 'appId',
  userId: 'userId',
})

const box = document.querySelector('.box')!
const expose = document.querySelector('.expose')!
const cancelExpose = document.querySelector('.cancel-expose')!

let boxIntersectionObserver: IntersectionObserver | null = null
expose.addEventListener('click', () => {
  if (boxIntersectionObserver) {
    boxIntersectionObserver.unobserve(box)
  }
  boxIntersectionObserver = createIntersection(box)
})

cancelExpose.addEventListener('click', () => {
  boxIntersectionObserver?.unobserve(box)
})
