/**
 * dom 관련 함수 모음
**/

const removeNode = el => el && el.parentNode && el.parentNode.removeChild(el)

const isElement = el => !!(el && el.nodeType === Node.ELEMENT_NODE)

const getElement = (selector) => {
  return document.querySelector(selector)
}

const getElementAllNestedDom = (el, selector) => {
  return el.querySelectorAll(selector)
}

const getElementAllSiblingsDom = (parentNode, selector) => {
  return parentNode.querySelectorAll(selector)
}

const getElementIndex = (selector, index) => {
  return document.querySelectorAll(selector)[index]
}

const addClass = (el, className) => {
  if (className && isElement(el) && el.classList) {
    el.classList.add(className)
  }
}

const removeClass = (el, className) => {
  if (className && isElement(el) && el.classList) {
    el.classList.remove(className)
  }
}

const switchClass = (selector, fromTo) => {
  const el = isElement(selector) ? selector : document.querySelector(selector)
  if (fromTo && el.classList) {
    el.classList.remove(fromTo[0])
    if (fromTo[1] !== undefined) {
      el.classList.add(fromTo[1])
    }
  }
}

const hasClass = (el, className) => {
  if (className && isElement(el) && el.classList) {
    return el.classList.contains(className)
  }
  return false
}

const setAttr = (el, attr, value) => {
  if (attr && isElement(el)) {
    el.setAttribute(attr, value)
  }
}

const removeAttr = (el, attr) => {
  if (attr && isElement(el)) {
    el.removeAttribute(attr)
  }
}

const trim = (html) => {
  return html.replace(/&nbsp;/gi, '').trim()
}

const getAttr = (el, attr) => (attr && isElement(el) ? el.getAttribute(attr) : null)

const hasAttr = (el, attr) => (attr && isElement(el) ? el.hasAttribute(attr) : null)

// Set an style property on an element
const setStyle = (el, prop, value) => {
  if (prop && isElement(el)) {
    el.style[prop] = value
  }
}

const removeStyle = (el, prop) => {
  if (prop && isElement(el)) {
    el.style[prop] = ''
  }
}

const switchDisplay = (from, to) => {
  from.style.display = 'none'
  setTimeout(() => {
    to.style.display = 'block'
  }, 300)
}

const getStyle = (el, prop) => (prop && isElement(el) ? el.style[prop] || null : null)

/*
텍스트 오버플로우 되었는지 여부 확인
*/
const isOverflow = (el) => {
  var curOverflow = el.style.overflow
  if (!curOverflow || curOverflow === 'visible') {
    el.style.overflow = 'hidden'
  }
  const isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight
  el.style.overflow = curOverflow
  return isOverflowing
}

/*
element array에서 특정 클래스명을 지우고 타킷 element에 적용
*/
const removeClassInElArrayAndThenAddClassOnTargetEl = (elArray, targetEl, className) => {
  removeClassInElArray(elArray, className)
  addClass(targetEl, className)
}

const removeClassInElArray = (elArray, className) => {
  Array.from(elArray).forEach(item => {
    removeClass(item, className)
  })
}

// const removeAllElementByClassName = (className) => {
//   const targets = document.querySelector(className)
//   console.log('>>>>>', targets)
//   // Array.from(elArray).forEach(item => {
//   //   removeClass(item, className)
//   // })
// }

/*
path에서 특정 클래스명 el 찾기
TODO : childNodes 까지 뒤지자!!!
*/
const findElByClassNameFromPath = (path, className) => {
  return path.filter((el) => hasClass(el, className))[0]
}

const stringToDom = (htmlStr) => {
  var frame = document.createElement('iframe')
  frame.style.display = 'none'
  document.body.appendChild(frame)
  frame.contentDocument.open()
  frame.contentDocument.write(htmlStr)
  frame.contentDocument.close()
  var el = frame.contentDocument.body.firstChild
  document.body.removeChild(frame)
  return el
}

/*
엘리먼트 draggable 만들기
e: Header element mousedown event
targetSelector: target element class name (must be unique of the app)
참고:
- el-popover를 draggable할 경우 persistent=false(persistent 의미 elementPlus 공식사이트 참고)
*/
const draggableElementHandler = (e, targetSelector) => {
  e.preventDefault()
  const $el = getElement(targetSelector)
  setStyle($el, 'position', 'absolute')
  setStyle(e.toElement, 'cursor', 'move')
  let pos1 = 0
  let pos2 = 0
  let pos3 = e.clientX
  let pos4 = e.clientY
  document.onmousemove = (e) => {
    e.preventDefault()
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    $el.style.top = ($el.offsetTop - pos2) + 'px'
    $el.style.left = ($el.offsetLeft - pos1) + 'px'
  }
  document.onmousedown = (e) => {
    const isTarget = findElByClassNameFromPath(e.composedPath(), targetSelector.substr(1, targetSelector.length))
    if (isTarget !== undefined) {
      e.preventDefault()
    }
  }
  e.toElement.onmouseup = (e) => {
    e.preventDefault()
    document.onmousedown = null
    document.onmousemove = null
  }
}
/*
이벤트 패스 배열 오브젝트
최소 엣지, 크롬의 버전 지원 여부에 따른 간결처리
*/
const getComposedPath = (e) => {
  return e.path || e.composedPath()
}

export default {
  removeNode,
  getElement,
  getElementAllNestedDom,
  getElementAllSiblingsDom,
  addClass,
  removeClass,
  switchClass,
  hasClass,
  setAttr,
  removeAttr,
  getAttr,
  hasAttr,
  setStyle,
  removeStyle,
  getStyle,
  switchDisplay,
  trim,
  isOverflow,
  findElByClassNameFromPath,
  removeClassInElArrayAndThenAddClassOnTargetEl,
  removeClassInElArray,
  stringToDom,
  draggableElementHandler,
  getComposedPath,
  getElementIndex
}
