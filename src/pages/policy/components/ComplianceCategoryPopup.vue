<template>
  <el-dialog
    v-model="dialogVisible"
    title="컴플라이언스 카테고리 추가"
    :width="dialogWidth"
    @close="onClose"
    class="custom-dialog"
    align-center
  >
    <el-form label-position="top">
      <!-- 상위정책 분야명 -->
      <el-form-item label="카테고리명">
        <el-input
          v-model="formData.categoryName"
          :disabled="formData.categoryName || policyType === 'parent'"
          placeholder="상위정책 분야명"
        />
      </el-form-item>

      <!-- 상세설명 -->
      <el-form-item label="상세설명">
        <el-input
          v-model="formData.description"
          type="textarea"
          rows="3"
          placeholder="상세설명을 입력해주세요"
        />
      </el-form-item>
    </el-form>

    <!-- 푸터 영역 (버튼 표시) -->
    <template #footer>
      <div class="dialog-footer" :class="{ 'flex-end': !formData.menuName || policyType !== 'edit' }">
        <!-- 정책 데이터가 있을 때만 삭제 버튼 표시 -->
        <el-button v-if="formData.menuName && policyType === 'edit'" type="danger" @click="deletePolicy">
          <el-icon><Delete /></el-icon> 삭제
        </el-button>

        <div class="footer-right">
          <el-button plain @click="onClose">취소</el-button>
          <el-button class="black-button" type="info" @click="submitForm">
            {{ formData.menuName && policyType === 'edit' ? "수정완료" : "추가완료" }}
          </el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { Delete } from "@element-plus/icons-vue";

const props = defineProps({
  visible: Boolean,
  selectedData: Object,  // 추가됨
});

const emit = defineEmits(["close", "submit", "delete"]);

// 다이얼로그의 상태 동기화
const dialogVisible = ref(props.visible);
watch(() => props.visible, (val) => {
  dialogVisible.value = val;
});

// `selectedData`가 변경될 때 `formData` 업데이트
const formData = ref({});
watch(() => props.selectedData, (newData) => {
  formData.value = newData ? { ...newData } : {};
}, { immediate: true });

// 반응형 다이얼로그 크기 설정
const dialogWidth = ref(window.innerWidth < 600 ? "90vw" : "500px");
const updateDialogWidth = () => {
  dialogWidth.value = window.innerWidth < 600 ? "90vw" : "500px";
};

// 창 크기 변경 이벤트 감지 (반응형 지원)
onMounted(() => {
  window.addEventListener("resize", updateDialogWidth);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateDialogWidth);
});

// 다이얼로그 닫기
const onClose = () => {
  emit("close", false);
};

// 폼 제출
const submitForm = () => {
  emit("submit", formData.value);
  onClose();
};

// 정책 삭제
const deletePolicy = () => {
  emit("delete", formData.value);
  onClose();
};
</script>

<style scoped src="@/assets/styles/components/ComplianceCategoryPopup.css"></style>
