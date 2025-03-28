
<template>
  <el-dialog
    v-model="dialogVisible"
    title="자산 일괄등록"
    :width="dialogWidth"
    :close-on-click-modal="false"
    class="custom-dialog"
    align-center
    @close="closeDialog"
  >
    <el-scrollbar class="no-x-scroll">
      <div class="modal-body">

        <el-form label-position="top">
          <!-- 파일 업로드 -->
          <el-form-item label="파일등록">
            <el-upload
              class="upload-container"
              drag
              multiple
              :show-file-list="true"
              :before-upload="beforeUpload"
              :file-list="form.files"
              :on-remove="handleRemove"
              :auto-upload="false"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <p>파일을 이곳에 드래그하거나 <span class="upload-text">여기를 클릭해주세요</span></p>
              <p class="upload-hint">jpg/png files with a size less than 500KB.</p>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
    </el-scrollbar>

    <!-- 하단 버튼 -->
    <template #footer>
      <div class="dialog-footer space">
        <BaseButton @click="downloadFile" class="white-button">양식 다운로드&nbsp;<el-icon><Download/></el-icon></BaseButton>
        <BaseButton @click="submitForm" class="black-button">등록하기</BaseButton>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";

const form = ref({
  files: []
});

const props = defineProps({
  visible: Boolean,
});


const emit = defineEmits(["close", "OpenResultPopup"]);

// 다이얼로그의 상태 동기화
const dialogVisible = ref(false);
watch(() => props.visible, (val) => {
  dialogVisible.value = val;
});

const closeDialog = () => {
  dialogVisible.value = false;
  emit("close", false);
};
const downloadFile = () => {

}


const beforeUpload = (file) => {
  if (file.size > 500 * 1024) {
    alert("파일 크기가 500KB를 초과할 수 없습니다.");
    return false;
  }
  return true;
};

const handleRemove = (file, fileList) => {
  form.value.files = fileList;
};

const submitForm = () => {
  console.log("제출 데이터:", form.value);
  // dialogVisible.value = false;
  emit("close", false);
  emit("result");
};

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

<style scoped src="@/assets/styles/components/NewCompliance.css"></style>
