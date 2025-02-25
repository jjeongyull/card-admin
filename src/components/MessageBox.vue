<template>
 <teleport to="body">
   <!-- msg 타입 -->
   <transition name="fade">
      <div v-if="visible && type === 'msg'" class="message-box" :class="status" :style="positionStyle">
        <span>{{ message }}</span>
      </div>
    </transition>


   <!-- alert 타입 -->
   <transition name="fade">
     <div v-if="visible && type === 'alert'" class="alert-box" :style="positionStyle">
       <span>{{ message }}</span>
       <button class="close-btn" @click="close">&times;</button>
     </div>
   </transition>

   <!-- confirm 타입 -->
   <div v-if="visible && type === 'confirm'" class="modal-overlay">
     <div class="modal-box confirm-box" :style="positionStyle">
       <h3>{{ title }}</h3>
       <p>{{ message }}</p>
       <div class="modal-footer">
         <button class="cancel-btn" @click="close">취소</button>
         <button class="confirm-btn" @click="confirmAction">확인</button>
       </div>
     </div>
   </div>

   <!-- modal 타입 -->
   <div v-if="visible && type === 'modal'" class="modal-overlay">
     <div class="modal-box" :style="positionStyle">
       <h3>{{ title }}</h3>
       <keep-alive>
        <component :is="component" />
       </keep-alive>
       <div class="modal-footer">
         <button class="cancel-btn" @click="close">취소</button>
         <button class="confirm-btn" @click="confirmAction">확인</button>
       </div>
     </div>
   </div>
 </teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";

const props = defineProps({
 type: { type: String, required: true }, // msg, alert, confirm, modal
 status: { type: String, default: "info" }, // info, success, warning, error
 message: { type: String, default: "" },
 title: { type: String, default: "" },
 position: { type: String, default: "top" }, // top, center, bottom, etc.
 component: [Object, Function], // modal에서 렌더링할 컴포넌트
 onConfirm: Function,
 duration: { type: Number, default: 3000 }
});

const emit = defineEmits(["close", "confirm"]);
const visible = ref(true);

// ype이 변경될 때마다 visible을 다시 true로 설정
watch(() => props.type, () => {
 visible.value = true;
});

// position에 따라 동적 스타일 반환
const positionStyle = computed(() => {
 switch (props.position) {
   case "top": return { top: "70px", left: "50%", transform: "translateX(-50%)" };
   case "center": return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
   case "bottom": return { bottom: "10px", left: "50%", transform: "translateX(-50%)" };
   case "top-left": return { top: "70px", left: "10px" };
   case "top-right": return { top: "70px", right: "10px" };
   case "bottom-left": return { bottom: "10px", left: "10px" };
   case "bottom-right": return { bottom: "10px", right: "10px" };
   default: return { top: "70px", left: "50%", transform: "translateX(-50%)" };
 }
});

const close = () => {
 visible.value = false;
 emit("close");
};

onMounted(() => {
  if (props.type === "msg") {
    setTimeout(() => {
      visible.value = false;
      emit("close");
    }, props.duration);
  }
});


const confirmAction = () => {
 if (props.onConfirm) props.onConfirm();
 close();
};
</script>

<style scoped>
/* 애니메이션 효과 */
.fade-enter-active, .fade-leave-active {
 transition: opacity 0.3s ease-in-out;
}
.fade-enter, .fade-leave-to {
 opacity: 0;
}

/* 메시지 박스 기본 스타일 */
.message-box, .alert-box {
 position: fixed;
 padding: 10px 15px;
 border-radius: 2px;
 font-size: 14px;
 color: #333;
 box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
 display: flex;
 justify-content: space-between;
 align-items: center;
 min-width: 280px;
 z-index: 1000;
 overflow-x: auto;
}

/* ✅ 메시지 타입별 색상 */
.message-box.info { background: #e3f2fd; color: #1565c0; }
.message-box.success { background: #e8f5e9; color: #2e7d32; }
.message-box.warning { background: #fff3e0; color: #ef6c00; }
.message-box.error { background: #ffebee; color: #c62828; }
.alert-box { background: #fff8e1; color: #8d6e63; }

/* ✅ 닫기 버튼 */
.close-btn {
 background: none;
 border: none;
 font-size: 16px;
 cursor: pointer;
 color: inherit;
}

/* 모달 오버레이 */
.modal-overlay {
 position: fixed;
 top: 0;
 left: 0;
 width: 100vw;
 height: 100vh;
 background: rgba(0, 0, 0, 0.4);
 display: flex;
 align-items: center;
 justify-content: center;
 z-index: 1000;
}

/* 모달 박스 */
.modal-box {
 background: white;
 position: absolute;
 padding: 24px;
 border-radius: 5px;
 min-width: 360px;
 max-width: 420px;
 text-align: center;
 box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
 transition: transform 0.3s ease-in-out;
}

/* confirm 박스 */
.confirm-box {
 border-top: 4px solid #42a5f5;
}

/* 모달 버튼 */
.modal-footer {
 display: flex;
 justify-content: flex-end;
 gap: 12px;
 margin-top: 16px;
}

button {
 padding: 8px 16px;
 border: none;
 border-radius: 6px;
 cursor: pointer;
 font-size: 14px;
 transition: background 0.2s;
}

.cancel-btn {
 background: #f5f5f5;
 color: #333;
}

.confirm-btn {
 background: #42a5f5;
 color: white;
}

.confirm-btn:hover {
 background: #1e88e5;
}
</style>
