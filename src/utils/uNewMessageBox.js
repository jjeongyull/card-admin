import { uDom, uNewCommon } from "@/utils";
import { ElMessage, ElNotification } from "element-plus";
import { nextTick } from "vue";

/**
 * 커스텀 메시지 함수
 * @param {string} message - 출력할 메시지
 * @param {string} type - 메시지 타입 (success, info, warning, error)
 * @param {number} duration - 지속 시간 (ms)
 * @param {string} position - 메시지 위치 (top, bottom, left, right, center)
 * @param {boolean} closeable - 닫기 버튼 여부
 * @param {boolean} stack - 중복 메시지 허용 여부 (기본: false)
 */
const showMessage = ({
  message,
  type = "info",
  duration = 3000,
  position = "top", // 기본적으로 상단 표시
  closeable = true,
  stack = false,
}) => {
  
  const centralMsgShowe = uDom.getElement(".custom-message-centre-style");
  if (!uNewCommon.isEmpty(centralMsgShowe)) {
    uDom.removeNode(centralMsgShowe);
  }

  // 기존 메시지와 동일한 내용이 있을 경우 제거 (stack=false일 때)
  if (!stack) {
    const existingMessage = document.querySelector(".el-message");
    if (existingMessage) {
      existingMessage.remove();
    }
  }

  nextTick(() => {
    ElMessage({
      message: message,
      type: type,
      duration: duration,
      grouping: true,
      showClose: closeable,
      dangerouslyUseHTMLString: true,
      position: position,
      customClass: `custom-message-${position}`, // 위치 설정을 위한 클래스 추가
    });
  });

  nextTick(() => {
    // 모달(.el-overlay)이 떠 있는 경우 메시지 박스를 최상위로 조정
    const overlayExists = uDom.getElement(".el-overlay");
    if (!uNewCommon.isEmpty(overlayExists)) {
      const elMessage = uDom.getElement(".el-message");
      if (elMessage) {
        uDom.addClass(elMessage, "custom-message-max-zindex");
      }
    }
  });
};

/**
 * 커스텀 알림 함수 (Notification)
 * @param {string} title - 알림 제목
 * @param {string} message - 알림 내용
 * @param {string} type - 알림 타입 (success, info, warning, error)
 * @param {number} duration - 지속 시간 (ms)
 * @param {string} position - 알림 위치 (top-right, top-left, bottom-right, bottom-left)
 */
const showNotification = ({
  title,
  message,
  type = "info",
  duration = 5000,
  position = "top-right",
}) => {
  ElNotification({
    title,
    message,
    type,
    duration,
    position,
    showClose: true,
    dangerouslyUseHTMLString: true,
  });
};

export default { 
  showMessage, 
  showNotification 
};

