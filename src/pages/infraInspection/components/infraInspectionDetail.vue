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

          </div>
        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Search } from '@element-plus/icons-vue'

const searchValue = ref('');
const chartData = ref([
  { name: "점검성공", value: 55, color: "#333333" },
  { name: "점검실패", value: 45, color: "#F56C6C" }
]);

const tableData = [{
  all: 17, sucess: 7, inAll: 9, inHigh: 0, inMiddle: 0, inBottom: 0, other: 0, na: 0
}]

</script>

<style scoped lang="scss">
@import '@/assets/styles/pages/PolicyManagement.css';
</style>