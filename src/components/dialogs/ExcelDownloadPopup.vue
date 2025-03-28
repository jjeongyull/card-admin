

<template>
  <el-dialog
    v-model="dialogVisible"
    title="엑셀다운로드"
    :width="dialogWidth"
    :close-on-click-modal="false"
    class="custom-dialog"
    align-center
    @close="closeDialog"
  >
    <el-scrollbar class="no-x-scroll">
      <div class="modal-body">
        <p class="mb-20">
          ※ 검색된 2건을 아래 형식으로 엑셀다운로드 합니다.<br>
          ❪ 컬럼 헤더 드래그앤드롭으로 위치를 변경하거나 컬럼설정에서 컬럼을 추가/제거할 수있습니다. ❫
        </p>

        <BaseButton class="black-button mb-20">칼럼 설정&nbsp;<el-icon><Operation /></el-icon></BaseButton>

        <BaseTable
            :tableColumns="tableColums"
            :tableData="tableData"
            :allData="tableData"
            :pageUse="false"
          />
      </div>
    </el-scrollbar>

    <!-- 하단 버튼 -->
    <template #footer>
      <div class="dialog-footer">
        <BaseButton class="white-button" @click="closeDialog">취소</BaseButton>
        <BaseButton @click="submitForm" class="black-button">확인</BaseButton>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  tableColums: Array,
  tableData: Array,
});

const selectedData = ref(null);
watch(() => props.selectData, (newVal) => {
  selectedData.value = newVal;
  if (newVal) {
    form.value = { ...newVal };
  }
}, { immediate: true });


const emit = defineEmits(["close"]);

// 다이얼로그의 상태 동기화
const dialogVisible = ref(false);
watch(() => props.visible, (val) => {
  dialogVisible.value = val;
});

const closeDialog = () => {
  dialogVisible.value = false;
  emit("close", false);
};



// 반응형 다이얼로그 크기 설정
const dialogWidth = ref(window.innerWidth < 800 ? "90vw" : "800px");
const updateDialogWidth = () => {
  dialogWidth.value = window.innerWidth < 800 ? "90vw" : "800px";
};

// 창 크기 변경 이벤트 감지 (반응형 지원)
onMounted(() => {
  window.addEventListener("resize", updateDialogWidth);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateDialogWidth);
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/components/NewCompliance.css';
</style>
