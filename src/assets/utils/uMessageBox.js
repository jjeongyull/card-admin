/**
 * MessageBox 정의
 * element plus message, notification, messagebox component 사용
**/

import { ElMessage, ElNotification, ElMessageBox } from 'element-plus'
import { h } from 'vue'
import { uDom, uCommon } from '@/assets/utils'

/*
메시지
type : info, error, warning
*/
const showMessage = (message, type, duration) => {
  type = type || 'info'
  duration = duration || 3000

  /* 모달이 떠 있는경우 메시지 박스가 뒤로 숨어서, 모달이 있으면 zindex 커스텀 클래스 적용으로 무조건 최상위! */
  const thereHasBeenOverlayAlready = uDom.getElement('.el-overlay')
  ElMessage({
    message: message,
    type: type,
    duration: duration,
    grouping: true,
    showClose: true,
    dangerouslyUseHTMLString: true
  })

  if (!uCommon.isEmpty(thereHasBeenOverlayAlready)) {
    uDom.addClass(uDom.getElement('.el-message'), 'custom-message-max-zindex')
  }
}

/*
메시지(중앙 집중형 메시지)
사용자 액션 상태를 강조해서 알려줘야 할 경우 사용
showMessage 활용하여 분기처리 안하고 그냥 새로 만들었다.
*/
const showCentreMessage = (message, custType, duration, showClose) => {
  const type = !uCommon.isEmpty(custType) ? 'custom-message-centre-style-'.concat(custType) : ''
  duration = duration || 2000
  showClose = showClose || true

  /* 모달이 떠 있는경우 메시지 박스가 뒤로 숨어서, 모달이 있으면 zindex 커스텀 클래스 적용으로 무조건 최상위! */
  const thereHasBeenOverlayAlready = uDom.getElement('.el-overlay')
  const f = ElMessage({
    message: message,
    type: 'info',
    duration: duration,
    grouping: true,
    showClose: showClose,
    dangerouslyUseHTMLString: true,
    customClass: 'custom-message-centre-style' + ' ' + type
  })

  if (!uCommon.isEmpty(thereHasBeenOverlayAlready)) {
    uDom.addClass(uDom.getElement('.el-message'), 'custom-message-max-zindex')
  }
  return f
}

/* 알림: 기본 */
const showNotification = (title, message, duration) => {
  duration = duration || 5000
  ElNotification.success({
    title: title,
    message: h('span', { style: 'color: #444444' }, message),
    duration: duration
  })
}

/* 알림: h함수고 메시지 직접 작성 */
const showhNotification = (title, h, duration) => {
  duration = duration || 5000
  ElNotification.success({
    title: title,
    message: h,
    duration: duration
  })
}

/* alert 모달 */
const showAlertBox = (title, message, btnLabel, callback, customClass) => {
  callback = callback || function () { }
  btnLabel = btnLabel || '확인'
  customClass = customClass || ''
  ElMessageBox.alert(message, title, {
    confirmButtonText: btnLabel,
    showClose: false,
    closeOnPressEscape: false,
    closeOnClickModal: false,
    dangerouslyUseHTMLString: true,
    draggable: true,
    confirmButtonClass: 'el-button--info',
    cancelButtonClass: 'el-button--text',
    customClass: customClass,
    callback: () => {
      callback()
    }
  })
}

/*
alert 모달
최초 모달 1개만!!!
*/
let isAlerted = null
const showSingleAlertBox = (title, message, btnLabel, callback) => {
  callback = callback || function () { }
  btnLabel = btnLabel || '확인'
  if (isAlerted === null) {
    isAlerted = ElMessageBox.alert(message, title, {
      confirmButtonText: btnLabel,
      showClose: false,
      closeOnPressEscape: true,
      closeOnClickModal: true,
      dangerouslyUseHTMLString: true,
      draggable: true,
      confirmButtonClass: 'el-button--info',
      cancelButtonClass: 'el-button--text',
      callback: () => {
        callback()
        isAlerted = null
      }
    })
  }
}

/**
 * 확인 메시지 박스 표시
 * @param {string} title - 제목
 * @param {string} message - 메시지 내용
 * @param {string} confirmBtnType - 확인 버튼 타입 (primary, danger 등)
 * @param {string} confirmBtnLabel - 확인 버튼 텍스트
 * @param {string} cancelBtnLabel - 취소 버튼 텍스트
 * @param {Function} confirmCallback - 확인 버튼 클릭 시 실행될 함수
 * @param {Function} cancelCallback - 취소 버튼 클릭 시 실행될 함수
 * @param {boolean} closeOnClickModal - 모달 외부 클릭 시 닫기 여부
 */
const showConfirmBox = (title, message, confirmBtnType, confirmBtnLabel, cancelBtnLabel, confirmCallback, cancelCallback, closeOnClickModal) => {
  confirmBtnType = confirmBtnType || 'primary'
  cancelCallback = cancelCallback || function () { }
  closeOnClickModal = closeOnClickModal || false
  /* 'force-btn-color-' + confirmBtnType <- danger만 common.scss에 적용했다.
  추가 스타일이 필요하면 force-btn-color-info와 같이 common.scss에 선언하자! */
  ElMessageBox.confirm(
    message,
    title,
    {
      confirmButtonText: confirmBtnLabel,
      cancelButtonText: cancelBtnLabel,
      showClose: false,
      draggable: true,
      closeOnPressEscape: closeOnClickModal,
      closeOnClickModal: closeOnClickModal,
      dangerouslyUseHTMLString: true,
      confirmButtonClass: 'force-btn-color-' + confirmBtnType,
      cancelButtonClass: 'el-button--text'
    }
  )
    .then(() => {
      confirmCallback()
    })
    .catch(() => {
      cancelCallback()
    })
}

const hideConfirmBox = () => {
  ElMessageBox.close()
}

export default {
  showMessage,
  showCentreMessage,
  showNotification,
  showhNotification,
  showAlertBox,
  showSingleAlertBox,
  showConfirmBox,
  hideConfirmBox
}
