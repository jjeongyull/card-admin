<template>
  <el-dialog v-model="dialogVisible" title="정책분야 등록 및 수정" width="500px" @close="onClose">
    <el-form label-position="top">
      <!-- 상위정책 분야명 -->
      <el-form-item label="상위정책 분야명">
        <el-input v-model="formData.parentName" disabled />
      </el-form-item>

      <!-- 상위정책 코드 -->
      <el-form-item label="상위정책 코드">
        <el-input v-model="formData.parentCode" placeholder="정책분야코드 (Optional)" disabled />
      </el-form-item>

      <!-- 정책분야명 -->
      <el-form-item label="정책분야명">
        <el-input v-model="formData.policyName" />
      </el-form-item>

      <!-- 상세설명 -->
      <el-form-item label="상세설명">
        <el-input v-model="formData.description" type="textarea" rows="3" />
      </el-form-item>
    </el-form>

    <!-- 푸터 영역 (버튼 표시) -->
    <template #footer>
      <div class="dialog-footer">
        <!-- 정책 데이터가 있을 때만 삭제 버튼 표시 -->
        <el-button v-if="formData.policyName" type="danger" @click="deletePolicy">
          <el-icon><Delete /></el-icon> 삭제
        </el-button>
        
        <div class="footer-right">
          <!-- 정책 데이터가 있을 때: "취소", "수정완료" / 없을 때: "닫기", "완료" -->
          <el-button @click="onClose">{{ formData.policyName ? "취소" : "닫기" }}</el-button>
          <el-button type="primary" @click="submitForm">{{ formData.policyName ? "수정완료" : "완료" }}</el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { Delete } from "@element-plus/icons-vue";

const props = defineProps({
  visible: Boolean,
  policyData: Object
});

const emit = defineEmits(["update:visible", "submit", "delete"]);

const dialogVisible = ref(props.visible);
const formData = ref({});

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

<style scoped>
/* 팝업 전체 스타일 */
.el-dialog {
  border-radius: 8px;
}

/* 푸터 스타일 */
.dialog-footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

/* 우측 버튼 정렬 */
.footer-right {
  display: flex;
  gap: 8px;
}
</style>
