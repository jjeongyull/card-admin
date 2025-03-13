<template>
  <el-dialog
    v-model="viewState"
    title="통합통제항목 변경이력"
    :width="dialogWidth"
    align-center
    :close-on-click-modal="false"
     @close="closeDialog"
  >
  <el-scrollbar class="no-x-scroll">
    <div class="modal-body">
      <el-timeline class="timeline">
        <el-timeline-item
          v-for="(log, index) in changeLogs"
          :key="index"
          :timestamp="formatDate(log.timestamp)"
          placement="top"
        >
          <div class="log-content">
            <div class="log-box">
              <p class="log-title">{{ log.action }}</p>
              <p class="log-user">by {{ log.user }}</p>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-scrollbar>

    <template #footer>
      <BaseButton  class="black-button" @click="closeDialog">확인</BaseButton >
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  visible: Boolean, // 팝업 열기/닫기 상태
  changeLogs: Array, // 변경 이력 데이터
});

const emit = defineEmits(["close"]);

const viewState = ref(false);
watch(() => props.visible, (val) => {
  viewState.value = val;
});

const closeDialog = () => {
  viewState.value = false;
  emit("close", false);
};

// 반응형 다이얼로그 크기 설정
const dialogWidth = computed(() => {
  return window.innerWidth < 600 ? "90vw" : "500px";
});

// 날짜 포맷 함수
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
</script>

<style scoped>
/* 타임라인 */
.timeline {
  padding-left: 5px;
  padding-right: 5px;
}

/* 로그 박스 스타일 */
.log-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.log-box {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.log-title {
  font-size: 14px;
  font-weight: bold;
  margin: 0;
}

.log-user {
  font-size: 12px;
  color: #777;
  margin-top: 4px;
}

/* 버튼 스타일 */
.el-button {
  width: 100%;
  border-radius: 6px;
}
</style>
