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
      <LogList
        :changeLogs="changeLogs"
      />
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

</script>
