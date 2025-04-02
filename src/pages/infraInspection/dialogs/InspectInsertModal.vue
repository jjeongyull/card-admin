

<template>
  <el-dialog
    v-model="dialogVisible"
    title="조치 증적 등록"
    :width="dialogWidth"
    :close-on-click-modal="false"
    class="custom-dialog"
    align-center
    @close="closeDialog"
  >
    <el-scrollbar class="no-x-scroll">
      <div class="modal-body">
        <el-row :gutter="20">

          <el-col :xs="24" :sm="24" :md="12">
            <div class="flex-space mb-20">
              <h4>조치 이력</h4>
              <BaseButton class="white-button">이력추가&nbsp;<el-icon><Plus/></el-icon></BaseButton>
            </div>

            <div class="input-round-box">
              <BaseTable
                :tableColumns="colums"
                :tableData="dumiData"
                :allData="dumiData"
                :pageUse="false"
              />
            </div>
          </el-col>

          <el-col :xs="24" :sm="24" :md="12">
            <el-row :gutter="20" class="mb-20">
              <el-col :xs="24" :sm="24" :md="8">
                <h4 class="mb-10">정책코드</h4>
                <p class="uderline-text black-bold">SRV-069</p>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8">
                <h4 class="mb-10">위험등급</h4>
                <p class="uderline-text black-bold">상</p>
              </el-col>
              <el-col :xs="24" :sm="24" :md="8">
                <h4 class="mb-10">점검결과</h4>
                <p class="uderline-text black-bold">취약</p>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="mb-20">
              <el-col :xs="24" :sm="24" :md="12">
                <h4 class="mb-10">점검항목</h4>
                <p class="uderline-text black-bold">바밀번호 관리정택 설정 미비</p>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12">
                <h4 class="mb-10">점검일시</h4>
                <p class="uderline-text black-bold">2025-03-12 03:02</p>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="mb-20">
              <el-col :xs="24" :sm="24" :md="24">
                <h4 class="mb-10">이력항목</h4>
                <p class="uderline-text">
                  <el-checkbox v-model="complate" label="점검완료" size="large" />
                </p>
              </el-col>
            </el-row>
            <div class="mb-20">
              <h4 class="mb-10">조치 내용</h4>
              <Editor v-model="detailGuide" />
            </div>
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

          </el-col>
        </el-row>
      </div>
    </el-scrollbar>

    <!-- 하단 버튼 -->
    <template #footer>
      <div class="dialog-footer">
        <BaseButton @click="closeDialog" class="white-button">닫기</BaseButton>
        <BaseButton class="black-button">저장</BaseButton>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import Editor from '@/components/Editor.vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: Object
});

const emit = defineEmits(["close"]);

const complate = ref(false);
const detailGuide = ref('');
const fileDataList = ref([]);

// 다이얼로그의 상태 동기화
const dialogVisible = ref(false);
const selectedData = ref(null);
watch(() => props.visible, (val) => {
  dialogVisible.value = val;
});
watch(() => props.data, (val) => {
  selectedData.value = val;
});
const closeDialog = () => {
  dialogVisible.value = false;
  selectedData.value = null;
  emit("close");
};

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

// 더미데이터
const colums = ref([
  { prop: "writeData", label: "작성일시"},
  { prop: "writer", label: "작성자"},
  { prop: "result", label: "점검결과"},
  { prop: "list", label: "이력항목"}
]);
const dumiData = [
  {writeData: '2025-02-23', writer: '관리자1', result: '점검결과 설명', list: '이력항목 설명'},
  {writeData: '2025-02-23', writer: '관리자1', result: '점검결과 설명', list: '이력항목 설명'},
  {writeData: '2025-02-23', writer: '관리자1', result: '점검결과 설명', list: '이력항목 설명'},
  {writeData: '2025-02-23', writer: '관리자1', result: '점검결과 설명', list: '이력항목 설명'},
  {writeData: '2025-02-23', writer: '관리자1', result: '점검결과 설명', list: '이력항목 설명'}
]
// 반응형 다이얼로그 크기 설정
const dialogWidth = ref(window.innerWidth < 1200 ? "90vw" : "1200px");
const updateDialogWidth = () => {
  dialogWidth.value = window.innerWidth < 1200 ? "90vw" : "1200px";
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
