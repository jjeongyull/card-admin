

<template>
  <el-dialog
    v-model="dialogVisible"
    title="점검결과"
    :width="dialogWidth"
    :close-on-click-modal="false"
    class="custom-dialog"
    align-center
    @close="closeDialog"
  >
    <el-scrollbar class="no-x-scroll">
      <div class="modal-body">
        <div class="mb-20">
          <h4 style="margin-bottom: 15px;">점검대상 정보</h4>
          <div class="white-box border">
            <el-row class="custom-row">
              <el-col :span="6" class="custom-label title">자산유형 / 구분</el-col>
              <el-col :span="6" class="custom-label">서버(OS) / UNIX</el-col>
              <el-col :span="6" class="custom-label title">서비스명</el-col>
              <el-col :span="6" class="custom-label">123.456.789</el-col>
            </el-row>
            <el-row class="custom-row">
              <el-col :span="6" class="custom-label title">IP / PORT</el-col>
              <el-col :span="6" class="custom-label">123.456.788</el-col>
              <el-col :span="6" class="custom-label title">HOST</el-col>
              <el-col :span="6" class="custom-label">tetrapod3</el-col>
            </el-row>
            <el-row class="custom-row">
              <el-col :span="6" class="custom-label title">INFRA 담당자 / 부서</el-col>
              <el-col :span="6" class="custom-label">현업담당자2 / 정보보안팀</el-col>
              <el-col :span="6" class="custom-label title">점검결과</el-col>
              <el-col :span="6" class="custom-label">점검 성공</el-col>
            </el-row>
            <el-row class="custom-row">
              <el-col :span="6" class="custom-label title">점검시작일시</el-col>
              <el-col :span="6" class="custom-label">2025-02-28 19:58:51</el-col>
              <el-col :span="6" class="custom-label title">점점종료일시</el-col>
              <el-col :span="6" class="custom-label">2024-04-25 04:26:44</el-col>
            </el-row>
            <el-row class="custom-row last">
              <el-col :span="6" class="custom-label title">조치요청일시</el-col>
              <el-col :span="6" class="custom-label">2025-02-28 19:58:51</el-col>
              <el-col :span="6" class="custom-label title">-</el-col>
              <el-col :span="6" class="custom-label">-</el-col>
            </el-row>
          </div>
        </div>

        <div class="mb-20">
          <h4 style="margin-bottom: 15px;">점검 결과</h4>
          <p class="flex gap-5" style="margin-bottom: 15px;"><el-icon><CircleCheckFilled /></el-icon>각 항목을 선택하여 세부 점검 결과를 확인하세요.</p>
          <div class="white-box border">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="all" label="전체"/>
              <el-table-column prop="sucess" label="양호" />
              <el-table-column label="취약등급">
                <el-table-column prop="inAll" label="전체" width="120" />
                <el-table-column prop="inHigh" label="상" width="120" />
                <el-table-column prop="inMiddle" label="중" width="120" />
                <el-table-column prop="inBottom" label="하" width="120" />
              </el-table-column>
              <el-table-column prop="other" label="예외" />
              <el-table-column prop="na" label="N/A"/>
            </el-table>
          </div>
        </div>

        <div class="white-box border mb-20">
          <BaseTable
            :tableColumns="tableColumns"
            :tableData="dumiData"
            :allData="dumiData"
            @cell-click="doRowClick"
            @sort=""
            :currentPage="currentPage"
            :pageSize="pageSize"
            @update:currentPage="updateCurrentPage"
            @history-click=""
            @actions-click=""
            @confrim-click="openInspectModal"
            @selected-rows="tableCheck"
          />
        </div>

      </div>
    </el-scrollbar>

    <!-- 하단 버튼 -->
    <template #footer>
      <div class="dialog-footer flex-space">
        <div class="flex gap-10">
          <BaseButton class="info-button">
            점검보고서 다운로드&nbsp;<el-icon><Download /></el-icon>
          </BaseButton>
          <BaseButton class="info-button" @click="mailPopOen">
            점검결과 조치 요청 보내기&nbsp;<el-icon><CaretRight /></el-icon>
          </BaseButton>
        </div>


        <div class="footer-right">
          <BaseButton class="info-button" @click="closeDialog">닫기</BaseButton>
          <BaseButton @click="insertInspectAsset" class="black-button">저장</BaseButton>
        </div>
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
const emit = defineEmits(["close", "other"]);

const dialogVisible = ref(false);
watch(() => props.visible, (val) => {
  dialogVisible.value = val;
});
const closeDialog = () => {
  dialogVisible.value = false;
  emit("close", false);
};
const mailPopOen = () => {
  emit("other");
}
const tableColumns = [
  { label: '정책코드', prop: 'code', sortable: true},
  { label: '점검항목', prop: 'category', sortable: true },
  { label: '위험등급', prop: 'dangerousLevel', width: 100 },
  { label: '최초결과', prop: 'firstResult' },
  { label: '최종결과', prop: 'lastResult' },
  { label: '취약', prop: 'vulnerable' },
  { label: '예외', prop: 'exception' },
  { label: '상태', prop: 'state' }
];
const dumiData = [
  {code: 'SRV-012', category: '.netrc 파일 내 중요 정보 노출', dangerousLevel: '상', firstResult: '양호', lastResult: '취약', vulnerable: 'ckeck',  exception: '', state: '양호'},
  {code: 'SRV-012', category: '.netrc 파일 내 중요 정보 노출', dangerousLevel: '상', firstResult: '양호', lastResult: '취약', vulnerable: 'ckeck',  exception: '', state: '양호'},
  {code: 'SRV-012', category: '.netrc 파일 내 중요 정보 노출', dangerousLevel: '상', firstResult: '양호', lastResult: '취약', vulnerable: 'ckeck',  exception: '', state: '양호'},
  {code: 'SRV-012', category: '.netrc 파일 내 중요 정보 노출', dangerousLevel: '상', firstResult: '양호', lastResult: '취약', vulnerable: 'ckeck',  exception: '', state: '양호'},
  {code: 'SRV-012', category: '.netrc 파일 내 중요 정보 노출', dangerousLevel: '상', firstResult: '양호', lastResult: '취약', vulnerable: 'ckeck',  exception: '', state: '양호'},
  {code: 'SRV-012', category: '.netrc 파일 내 중요 정보 노출', dangerousLevel: '상', firstResult: '양호', lastResult: '취약', vulnerable: 'ckeck',  exception: '', state: '양호'},
  {code: 'SRV-012', category: '.netrc 파일 내 중요 정보 노출', dangerousLevel: '상', firstResult: '양호', lastResult: '취약', vulnerable: 'ckeck',  exception: '', state: '양호'},
  {code: 'SRV-012', category: '.netrc 파일 내 중요 정보 노출', dangerousLevel: '상', firstResult: '양호', lastResult: '취약', vulnerable: 'ckeck',  exception: '', state: '양호'},
];
const currentPage = ref(1);
const pageSize = ref(5); // 한 페이지에 표시할 개수
const updateCurrentPage = (page) => {
  currentPage.value = page;
};
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
@import '@/assets/styles/pages/PolicyManagement.css';
</style>
