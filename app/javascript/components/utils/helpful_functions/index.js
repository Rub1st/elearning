export const takeRandom = (max) => Math.floor(Math.random() * Math.floor(max))

export const searchFilter = (el, pattern) => el.label.toLowerCase().includes(pattern.toLowerCase()) || pattern === ''

export const createId = (list) => list.length ? Math.max(...list.map(el => el.id)) + 1 : 0

export const isEmpty = (el) => el === null || el.split(' ').join('') === ''

export const DateFormat = (date) => `${date.split(/(T|\.)/)[2]} ${date.split(/(T|\.)/)[0].split('-').reverse().join('-')}`

export const notify = (message, proc) =>  proc( message, {
  position: "top-left",
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  });