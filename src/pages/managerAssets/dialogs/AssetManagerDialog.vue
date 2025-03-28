<template>
  <el-dialog
    v-model="dialogVisible"
    title="점검그룹 등록"
    :width="dialogWidth"
    :close-on-click-modal="false"
    class="custom-dialog"
    align-center
    @close="closeDialog"
  >
    <el-scrollbar class="no-x-scroll">
      <div class="modal-body">

        <el-form label-position="top">
          <!-- 그룹명 -->
          <el-form-item class="mb-20" label="그룹명">
            <el-input v-model="form.name" placeholder="그룹명을 입력해주세요." />
          </el-form-item>

          <h4 class="mb-10">점검대상 요약</h4>
          <table class="black-table mb-20">
            <thead>
              <tr>
                <th class="first">자산전체</th>
                <th>웹</th>
                <th>앱</th>
                <th>네트워크</th>
                <th>보안장비</th>
                <th>서버</th>
                <th>데이터베이스</th>
                <th class="last">WEB / WAS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="first">0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td class="last">0</td>
              </tr>
            </tbody>
          </table>

          <h4 class="mb-10">점검대상</h4>
          <BaseTable
            :tableColumns="colums"
            :tableData="tableList"
            :allData="tableList"
            :pageUse="false"
            class="mb-20"
          />

          <BaseButton @click="openOther" class="white-button" style="width: 100%;">점검그룹 추가&nbsp;&nbsp;<el-icon><Plus/></el-icon></BaseButton>

        </el-form>
      </div>
    </el-scrollbar>

    <!-- 하단 버튼 -->
    <template #footer>
      <div class="dialog-footer">
        <BaseButton class="white-button" @click="closeDialog">취소</BaseButton>
        <BaseButton @click="submitForm" class="black-button">점검그룹 등록</BaseButton>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";

const form = ref({
  name: null,
  assetsList: []
});
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  tableList: Array
});
const emit = defineEmits(["close", 'other']);
// 다이얼로그의 상태 동기화
const dialogVisible = ref(false);
watch(() => props.visible, (val) => {
  dialogVisible.value = val;
});
const closeDialog = () => {
  dialogVisible.value = false;
  emit("close", false);
};

// 점검대상 테이블 헤더 데이터
const colums = ref([
  { prop: "type", label: "유형", width: "80"},
  { prop: "category", label: "자산 구분", width: "100"},
  { prop: "host", label: "HOST", width: "100"},
  { prop: "name", label: "자산명", width: "150"},
  { prop: "ip", label: "IP", width: "100"},
  { prop: "appManeger", label: "APP 담당자", width: "100"},
  { prop: "infraManager", label: "INFRA 담당자", width: "100"}
]);



const submitForm = () => {
  console.log("제출 데이터:", form.value);
  // dialogVisible.value = false;
};

// 반응형 다이얼로그 크기 설정
const dialogWidth = ref(window.innerWidth < 800 ? "90vw" : "800px");
const updateDialogWidth = () => {
  dialogWidth.value = window.innerWidth < 800 ? "90vw" : "800px";
};

const openOther = () => {
  emit("other");
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
