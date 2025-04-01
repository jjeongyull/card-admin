<template>
  <el-dialog
    v-model="dialogVisible"
    :title="selectData?'점검 프로젝트 수정': '점검 프로젝트 등록'"
    :width="dialogWidth"
    :close-on-click-modal="false"
    class="custom-dialog"
    align-center
    @close="closeDialog"
  >
    <el-scrollbar class="no-x-scroll">
      <div class="modal-body">

        <el-form label-position="top">
          <!-- 점검명 -->
          <el-form-item class="mb-20" label="점검명">
            <el-input v-model="form.name" placeholder="점검명을 입력해주세요." />
          </el-form-item>

          <div class="input-round-box mb-20">
            <div class="flex-space gap-10">
              <el-form-item label="시작일자" style="width: 100%;">
                <el-date-picker
                  v-model="form.startDate"
                  type="date"
                  placeholder="날짜 선택"
                  style="width: 100%;"
                />
              </el-form-item>
              <el-form-item label="종료일자" style="width: 100%;">
                <el-date-picker
                  v-model="form.endDate"
                  type="date"
                  placeholder="날짜 선택"
                  style="width: 100%;"
                />
              </el-form-item>
            </div>

            <el-form-item label="점검 빈도">
              <BaseSelect
                v-model="form.cycle"
                placeholder="플레이스홀더"
                style="width: 100%;"
                :selectData="['진행 중', '완료']"
              />
            </el-form-item>

            <div class="flex-space gap-10">
              <el-form-item label="점검 시각" style="width: 100%;">
                <BaseSelect
                  v-model="form.startTime"
                  placeholder="플레이스홀더"
                  style="width: 100%;"
                  :selectData="['시각?', '시각??']"
                />
              </el-form-item>
              <el-form-item label="점검 시간" style="width: 100%;">
                <BaseSelect
                  v-model="form.endTime"
                  placeholder="플레이스홀더"
                  style="width: 100%;"
                  :selectData="['시각?', '시각??']"
                />
              </el-form-item>
            </div>
          </div>

          <table class="black-table mb-20">
            <thead>
              <tr>
                <th class="first">Server</th>
                <th>DBMS</th>
                <th class="last">WEB / WAS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="first">3</td>
                <td>7</td>
                <td class="last">3</td>
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

          <div class="flex-space gap-10">
            <BaseButton @click="openOtherPopup" class="white-button w-full">점검그룹 추가&nbsp;<el-icon><Plus/></el-icon></BaseButton>
            <BaseButton class="info-button w-full">대상 선택&nbsp;<el-icon><Plus/></el-icon></BaseButton>
          </div>

        </el-form>
      </div>
    </el-scrollbar>

    <!-- 하단 버튼 -->
    <template #footer>
      <div class="dialog-footer" :class="selectData === null? 'flex-end': 'space'">
        <BaseButton v-if="selectData" type="danger" @click="deletePolicy">
          <el-icon><Delete /></el-icon> 삭제
        </BaseButton>

        <div class="footer-right">
          <BaseButton class="white-button" @click="closeDialog">취소</BaseButton>
          <BaseButton @click="submitForm" class="black-button">점검 프로젝트 등록</BaseButton>
        </div>

      </div>
    </template>
  </el-dialog>
</template>


<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
const form = ref({
  name: null,
  startDate: null,
  endDate: null,
  cycle: null,
  startTime: null,
  endTime: null,
  inspectList: [],
});
const emit = defineEmits(["close", "other"]);
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  selectData: {
    type: Object,
    default: null
  },
  tableList: Array
});

const openOtherPopup = () => {
  emit("other");
}
const colums = ref([
  { prop: "type", label: "유형", width: "80"},
  { prop: "category", label: "자산 구분", width: "100"},
  { prop: "host", label: "HOST", width: "100"},
  { prop: "name", label: "자산명", width: "150"},
  { prop: "ip", label: "IP", width: "100"},
  { prop: "appManeger", label: "APP 담당자", width: "100"},
  { prop: "infraManager", label: "INFRA 담당자", width: "100"}
]);

// 반응형 다이얼로그 크기 설정
const dialogWidth = ref(window.innerWidth < 800 ? "90vw" : "800px");
const updateDialogWidth = () => {
  dialogWidth.value = window.innerWidth < 800 ? "90vw" : "800px";
};
const selectedData = ref(null);
watch(() => props.selectData, (val) => {
  selectedData.value = val;
});

const dialogVisible = ref(false);
watch(() => props.visible, (val) => {
  dialogVisible.value = val;
});
const closeDialog = () => {
  dialogVisible.value = false;
  selectedData.value = null;
  emit("close", false);
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