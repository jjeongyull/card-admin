<template>
  <div class="responsive-row">
    <!-- 상단 정보 -->
    <el-row :gutter="10" class="mb-20">
      <el-col :xs="24" :sm="24" :md="12" style="display: flex; flex-direction: column;">
        <BaseCard title="점검명: 현대카드-앱-안드로이드 보안 점검(즉시실행)">
          <el-row class="card-content">
            <el-col :span="6" class="card-item">
              <span>총 점검 수량</span>
              <p><strong>3</strong>개</p>
            </el-col>
            <el-col :span="6" class="card-item">
              <span>Server</span>
              <p><strong>1</strong>개</p>
            </el-col>
            <el-col :span="6" class="card-item">
              <span>DBMS</span>
              <p><strong>1</strong>개</p>
            </el-col>
            <el-col :span="6" class="card-item">
              <span>WEB/WES</span>
              <p><strong>1</strong>개</p>
            </el-col>
          </el-row>
        </BaseCard>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" style="display: flex; flex-direction: column;">
        <BaseCard title="점검결과">
          <el-row class="card-content">
            <el-col :span="12" class="card-item">
              <span>취약</span>
              <p><strong>4</strong>개</p>
            </el-col>
            <el-col :span="12" class="card-item">
              <span>정상</span>
              <p><strong>5</strong>개</p>
            </el-col>
          </el-row>
        </BaseCard>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" style="display: flex; flex-direction: column;">
        <BaseCard title="점검현황">
          <BaseChart
            :chartData="chartData"
            chartType="pie"
            chartTitle="차트 타이틀"
            :percent="true"
            :type="true"
          />
        </BaseCard>
      </el-col>
    </el-row>

    <!-- 하단 본문 내용 -->
    <el-row :gutter="20" class="responsive-row-inner">
      <el-col :xs="24" :sm="12" :md="4">
        <div class="data-list">
          <h4 class="mb-20">점검대상</h4>
          <div class="mb-10">
            <el-input type="text" v-model="searchValue" :prefix-icon="Search" placeholder="점검대상 조회"/>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="20">
        <div class="mb-20">
          <h4 style="margin-bottom: 15px;">이행점검 목록</h4>
          <div class="white-box">
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

        <div>
          <h4 style="margin-bottom: 15px;">점검 결과</h4>
          <p class="flex gap-5" style="margin-bottom: 15px;"><el-icon><CircleCheckFilled /></el-icon>각 항목을 선택하여 세부 점검 결과를 확인하세요.</p>
          <div class="white-box mb-20">
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

          <div class="white-box mb-20">
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
                @actions-click="openInspectInsertModal"
                @confrim-click="openInspectModal"
                @selected-rows="tableCheck"
              />
          </div>

          <div class="white-box flex-space gap-10">
            <BaseButton class="info-button w-full">점검보고서 다운로드&nbsp;<el-icon><CaretRight/></el-icon></BaseButton>
            <BaseButton class="info-button w-full" @click="openInspectResultNoticModal">점검결과 조치 요청 보내기&nbsp;<el-icon><CaretRight/></el-icon></BaseButton>
            <BaseButton class="info-button w-full" @click="openInspectResultOpinionModal">점검 및 조치 의견 등록&nbsp;<el-icon><CaretRight/></el-icon></BaseButton>
            <BaseButton class="black-button w-full">점검실행&nbsp;<el-icon><CaretRight/></el-icon></BaseButton>
          </div>
        </div>
        <InspectModal
          :visible="InspectModalVisible"
          :data="InspectData"
          @close="closeInspectModal"
        />

        <InspectInsertModal
          :visible="InspectInsertModalVisible"
          :data="InspectInsertData"
          @close="closeInspectInsertModal"
        />

        <InspectResultNoticeDialog
          :visible="InspectResultNoticeDialogVisible"
          @close="closeInspectResultNoticeDialog"
        />

        <InspectResultOpinionDialog
          :visible="InspectResultOpinionDialogVisible"
          @close="closeInspectResultOpinionDialog"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Search } from '@element-plus/icons-vue'
import InspectModal from '../dialogs/InspectModal.vue';
import InspectInsertModal from '../dialogs/InspectInsertModal.vue';
import InspectResultNoticeDialog from '../dialogs/InspectResultNoticeDialog.vue';
import InspectResultOpinionDialog from '../dialogs/InspectResultOpinionDialog.vue';

// 점검결과 조치 의견 등록 팝업 관련
const InspectModalVisible = ref(false);
const InspectData = ref({});
const openInspectModal = () => {
  InspectModalVisible.value = true;
}
const closeInspectModal = () => {
  InspectData.value = {};
  InspectModalVisible.value = false;
}

// 조치 증적 등록 팝업 관련
const InspectInsertModalVisible = ref(false);
const InspectInsertData = ref({});
const openInspectInsertModal = () => {
  InspectInsertModalVisible.value = true;
}
const closeInspectInsertModal = () => {
  InspectInsertData.value = {};
  InspectInsertModalVisible.value = false;
}

// 점검결과 알림 이메일 팝업 관련
const InspectResultNoticeDialogVisible = ref(false);
const openInspectResultNoticModal = () => {
  InspectResultNoticeDialogVisible.value = true;
}
const closeInspectResultNoticeDialog = () => {
  InspectResultNoticeDialogVisible.value = false;
}

// 점검결과 조치 의견 등록 팝업 관련
const InspectResultOpinionDialogVisible = ref(false);
const openInspectResultOpinionModal = () => {
  InspectResultOpinionDialogVisible.value = true;
}
const closeInspectResultOpinionDialog = () => {
  InspectResultOpinionDialogVisible.value = false;
}

const searchValue = ref('');
const chartData = ref([
  { name: "점검성공", value: 55, color: "#333333" },
  { name: "점검실패", value: 45, color: "#F56C6C" }
]);

// 데이터 리스트
const tableData = [{
  all: 17, sucess: 7, inAll: 9, inHigh: 0, inMiddle: 0, inBottom: 0, other: 0, na: 0
}];

// 테이블 더미데이터
const tableColumns = [
  { label: '정책코드', prop: 'code', sortable: true},
  { label: '점검항목', prop: 'category', sortable: true },
  { label: '위험등급', prop: 'dangerousLevel', width: 100 },
  { label: '최초결과', prop: 'firstResult' },
  { label: '최종결과', prop: 'lastResult' },
  { label: '취약', prop: 'vulnerable' },
  { label: '증적', prop: 'evidence' },
  { label: '예외', prop: 'exception' },
  { label: '상태', prop: 'state' },
  { label: '이력', prop: 'record' },
];

const dumiData = [
  {code: 'SRV-012', category: '.netrc 파일 내 중요 정보 노출', dangerousLevel: '상', firstResult: '양호', lastResult: '취약', vulnerable: 'ckeck', evidence: 'ckeck', exception: '', state: '양호', record: 'check'},
  {code: 'SRV-012', category: '.netrc 파일 내 중요 정보 노출', dangerousLevel: '상', firstResult: '양호', lastResult: '취약', vulnerable: 'ckeck', evidence: 'ckeck', exception: '', state: '양호', record: 'check'},
  {code: 'SRV-012', category: '.netrc 파일 내 중요 정보 노출', dangerousLevel: '상', firstResult: '양호', lastResult: '취약', vulnerable: 'ckeck', evidence: 'ckeck', exception: '', state: '양호', record: 'check'},
  {code: 'SRV-012', category: '.netrc 파일 내 중요 정보 노출', dangerousLevel: '상', firstResult: '양호', lastResult: '취약', vulnerable: 'ckeck', evidence: 'ckeck', exception: '', state: '양호', record: 'check'},
  {code: 'SRV-012', category: '.netrc 파일 내 중요 정보 노출', dangerousLevel: '상', firstResult: '양호', lastResult: '취약', vulnerable: 'ckeck', evidence: 'ckeck', exception: '', state: '양호', record: 'check'},
  {code: 'SRV-012', category: '.netrc 파일 내 중요 정보 노출', dangerousLevel: '상', firstResult: '양호', lastResult: '취약', vulnerable: 'ckeck', evidence: 'ckeck', exception: '', state: '양호', record: 'check'},
  {code: 'SRV-012', category: '.netrc 파일 내 중요 정보 노출', dangerousLevel: '상', firstResult: '양호', lastResult: '취약', vulnerable: 'ckeck', evidence: 'ckeck', exception: '', state: '양호', record: 'check'},
  {code: 'SRV-012', category: '.netrc 파일 내 중요 정보 노출', dangerousLevel: '상', firstResult: '양호', lastResult: '취약', vulnerable: 'ckeck', evidence: 'ckeck', exception: '', state: '양호', record: 'check'},
];
const currentPage = ref(1);
const pageSize = ref(5); // 한 페이지에 표시할 개수
const updateCurrentPage = (page) => {
  currentPage.value = page;
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/pages/PolicyManagement.css';
</style>