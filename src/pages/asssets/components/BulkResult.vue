
<template>
  <el-dialog
    v-model="dialogVisible"
    title="자산 그룹 일괄등록 결과"
    :width="dialogWidth"
    :close-on-click-modal="false"
    class="custom-dialog"
    align-center
    @close="closeDialog"
  >
    <el-scrollbar class="no-x-scroll">
      <div class="modal-body not-scroll">
        <div class="status-div">
          <p>
            <el-icon class="succes-icon"><CircleCheckFilled /></el-icon>
            등록 성공: <strong>0건</strong>
          </p>
          <p>
            <el-icon class="fail-icon"><WarningFilled /></el-icon>
            등록 실패: <strong>1건</strong>
          </p>
        </div>

        <table class="black-table">
          <thead>
            <tr>
              <th class="first">상태</th>
              <th>업무명</th>
              <th>등록타입</th>
              <th class="last">비고</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="first">{{ data.status?'성공':'실패' }}</td>
              <td>{{ data.title }}</td>
              <td>{{ data.type }}</td>
              <td class="last">{{ data.other }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-scrollbar>

    <!-- 하단 버튼 -->
    <template #footer>
      <div class="dialog-footer">
        <BaseButton @click="closeDialog" class="black-button">확인</BaseButton>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";


const props = defineProps({
  visible: Boolean,
  data: Object,
});


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
