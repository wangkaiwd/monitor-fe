// todo: support export all single module and default whole module
import { reportExpose, init, reportClick } from '@monitor-fe/core'

init({
  appId: 'appId',
  userId: 'userId',
})

const pv = document.querySelector('.pv')!
const box = document.querySelector('.box')!

pv.addEventListener('click', (ev: Event) => {
  reportClick(ev)
})

box.addEventListener('appear', (ev: Event) => {
  reportExpose(ev)
})
