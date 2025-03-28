<template>
  <el-dialog
    v-model="dialogVisible"
    :title="policyType === '' || policyType === 'parent'?'정책분야 추가':'정책분야 수정'"
    :width="dialogWidth"
    @close="onClose"
    class="custom-dialog"
    align-center
  >
    <el-form label-position="top">
      <!-- 상위정책 분야명 -->
      <el-form-item label="상위정책 분야명">
        <el-input v-model="formData.menuName" :disabled="formData.menuName || policyType === 'parent'" placeholder="상위정책 분야명"/>
      </el-form-item>

      <!-- 상위정책 코드 -->
      <el-form-item label="상위정책 코드">
        <el-input v-model="formData.itemCode" placeholder="정책분야코드 (Optional)" :disabled="formData.menuName || policyType === 'parent'" />
      </el-form-item>

      <!-- 정책분야명 -->
      <el-form-item label="정책분야명">
        <el-input v-model="formData.label" placeholder="정책분야명을 입력해주세요"/>
      </el-form-item>

      <!-- 상태 -->
      <el-form-item label="상태" v-if="!formData.menuName">
        <BaseSelect
          v-model="selData"
          placeholder="상태를 선택해주세요."
          style="width: 100%;"
          :selectData="['상태1', '상태2', '상태3']"
        />
      </el-form-item>

      <!-- 상세설명 -->
      <el-form-item label="상세설명">
        <el-input v-model="formData.description" type="textarea" rows="3" placeholder="상세설명을 입력해주세요"/>
      </el-form-item>
    </el-form>

    <!-- 푸터 영역 (버튼 표시) -->
    <template #footer>
      <div class="dialog-footer" :class="{ 'flex-end': !formData.menuName || policyType !== 'edit' }">
        <!-- 정책 데이터가 있을 때만 삭제 버튼 표시 -->
        <BaseButton v-if="formData.menuName && policyType === 'edit'" type="danger" @click="deletePolicy">
          <el-icon><Delete /></el-icon> 삭제
        </BaseButton>

        <div class="footer-right">
          <!-- 정책 데이터가 있을 때: "취소", "수정완료" / 없을 때: "닫기", "완료" -->
          <BaseButton plain @click="onClose" class="white-button">닫기</BaseButton>
          <BaseButton class="black-button" type="info" @click="submitForm">{{ formData.menuName && policyType === 'edit' ? "수정완료" : "추가완료" }}</BaseButton>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { Delete } from "@element-plus/icons-vue";

const props = defineProps({
  visible: Boolean,
  policyData: Object,
  policyType: String
});

const emit = defineEmits(["update", "submit", "delete"]);

const dialogVisible = ref(props.visible);
const formData = ref({});
const selData = ref('')

// 반응형 다이얼로그 크기 설정
const dialogWidth = computed(() => {
  return window.innerWidth < 600 ? "90vw" : "500px";
});

// props가 변경될 때 `formData` 업데이트
watch(() => props.policyData, (newData) => {
  formData.value = newData ? { ...newData } : {};
}, { immediate: true });

const onClose = () => {
  emit("close", false);
};

const submitForm = () => {
  emit("submit", formData.value);
  onClose();
};

const deletePolicy = () => {
  emit("delete", formData.value);
  onClose();
};
</script>

<style scoped src="@/assets/styles/components/PolicyAddPopup.css"></style>
