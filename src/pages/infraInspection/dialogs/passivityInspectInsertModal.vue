

<template>
  <el-dialog
    v-model="dialogVisible"
    title="점검계획 등록"
    :width="dialogWidth"
    :close-on-click-modal="false"
    class="custom-dialog"
    align-center
    @close="closeDialog"
  >
    <el-scrollbar class="no-x-scroll">
      <div class="modal-body">
        <el-form label-position="top">
        <div class="flex-space gap-10">
          <el-form-item label="시작일자" class="w-full">
            <el-date-picker
              v-model="startDate"
              type="date"
              placeholder="날짜 선택"
              style="width: 100%;"
            />
          </el-form-item>
          <el-form-item label="종료일자" class="w-full">
            <el-date-picker
              v-model="endtDate"
              type="date"
              placeholder="날짜 선택"
              style="width: 100%;"
            />
          </el-form-item>
        </div>
        </el-form>
      </div>
    </el-scrollbar>

    <!-- 하단 버튼 -->
    <template #footer>
      <div class="dialog-footer">
        <BaseButton @click="closeDialog" class="white-button">닫기</BaseButton>
        <BaseButton class="black-button">등록</BaseButton>
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
  }
});

const emit = defineEmits(["close"]);


// 다이얼로그의 상태 동기화
const dialogVisible = ref(false);
watch(() => props.visible, (val) => {
  dialogVisible.value = val;
});
const closeDialog = () => {
  dialogVisible.value = false;
  emit("close");
};

// 더미데이터
// 반응형 다이얼로그 크기 설정
const dialogWidth = ref(window.innerWidth < 600 ? "90vw" : "600px");
const updateDialogWidth = () => {
  dialogWidth.value = window.innerWidth < 600 ? "90vw" : "600px";
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
