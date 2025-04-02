

<template>
  <el-dialog
    v-model="dialogVisible"
    title="점검결과 조치 의견 등록"
    :width="dialogWidth"
    :close-on-click-modal="false"
    class="custom-dialog"
    align-center
    @close="closeDialog"
  >
    <el-scrollbar class="no-x-scroll">
      <div class="modal-body">
        <el-form label-position="top">
          <el-form-item label="영구 예외">
            <el-radio-group v-model="status" class="flex-space">
              <el-radio label="점검의견">점검의견</el-radio>
              <el-radio label="조치의견">조치의견</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="상세의견">
            <el-input v-model="info" placeholder="상세의견을 입력해주세요."/>
          </el-form-item>

          <div>
            <h4 class="mb-10">첨부파일</h4>
            <el-upload
              class="upload-container"
              drag
              multiple
              :show-file-list="true"
              :before-upload="beforeUpload"
              :file-list="fileDataList"
              :on-remove="handleRemove"

              :auto-upload="false"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <p>파일을 이곳에 드래그하거나 <span class="upload-text">여기를 클릭해주세요</span></p>
              <p class="upload-hint">jpg/png files with a size less than 500KB.</p>
            </el-upload>
          </div>

        </el-form>
      </div>
    </el-scrollbar>

    <!-- 하단 버튼 -->
    <template #footer>
      <div class="dialog-footer">
          <BaseButton plain @click="closeDialog" class="info-button">닫기</BaseButton>
        <BaseButton class="black-button" @click="submitForm">등록</BaseButton>
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

const info = ref('');
const status = ref('');

const fileDataList = ref([]);
// 파일첨부 관련
const beforeUpload = (file) => {
  if (file.size > 500 * 1024) {
    alert("파일 크기가 500KB를 초과할 수 없습니다.");
    return false;
  }
  return true;
};

const handleRemove = (file, fileList) => {
  fileDataList.value = fileList;
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

<style scoped lang="scss">
@import '@/assets/styles/components/NewCompliance.css';
</style>
