/**
 * dom 관련 함수 모음
**/

const removeNode = el => el && el.parentNode && el.parentNode.removeChild(el)

const getElement = (selector) => {
  return document.querySelector(selector)
}

const addClass = (el, className) => {
  if (className && isElement(el) && el.classList) {
    el.classList.add(className)
  }
}



export default {
  removeNode,
  getElement,
  addClass,
}
