<template>
  <div>
    <div class="mb-20">
      <h4 style="margin-bottom: 15px;">결재현황</h4>
      <div class="white-box">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="all" label="상신">
            <el-table-column prop="inAll" label="현업 담당자" />
            <el-table-column prop="inAll" label="현업 부서장"/>
          </el-table-column>
          <el-table-column prop="all" label="통제">
            <el-table-column prop="inAll" label="관리 담당자" />
            <el-table-column prop="inAll" label="기술 담당자" />
            <el-table-column prop="inAll" label="개인정보 담당자" />
          </el-table-column>
          <el-table-column prop="all" label="처리">
            <el-table-column prop="inAll" label="현업 담당자" />
            <el-table-column prop="inAll" label="정보보안 담당자" />
          </el-table-column>
          <el-table-column prop="all" label="확인">
            <el-table-column prop="inAll" label="현업 부서장" />
            <el-table-column prop="inAll" label="보안 부서장" />
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="mb-20">
      <h4 style="margin-bottom: 15px;">결재현황</h4>
      <div class="white-box">
        <el-row :gutter="20" class="mb-20">
          <el-col :xs="24" :sm="24" :md="12">
            <h4 class="mb-10">정책코드</h4>
            <p class="uderline-text black-bold">SRV-069</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12">
            <h4 class="mb-10">위험등급</h4>
            <p class="uderline-text black-bold">상</p>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mb-20">
          <el-col :xs="24" :sm="24" :md="24">
            <h4 class="mb-10">신청 제목</h4>
            <p class="uderline-text black-bold">현대카드 앱_프리미엄 카드 신규 메뉴 개발</p>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mb-20">
          <el-col :xs="24" :sm="24" :md="12">
            <h4 class="mb-10">개발 완료일</h4>
            <p class="uderline-text black-bold">2024-06-14</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12">
            <h4 class="mb-10">오픈 예정일</h4>
            <p class="uderline-text black-bold">2024-06-14</p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="12">
            <h4 class="mb-10">증빈 담당자</h4>
            <p class="uderline-text black-bold">담당자</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12">
            <h4 class="mb-10">첨부파일</h4>
            <p class="uderline-text black-bold">첨부파일.txt</p>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="mb-20">
      <h4 style="margin-bottom: 15px;">대상장비</h4>
      <div class="white-box">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="na0" label="서비스명"/>
          <el-table-column prop="na00" label="개발구분" />
          <el-table-column prop="na100" label="서비스유형" />
          <el-table-column prop="na1" label="접속유형"/>
          <el-table-column prop="na2" label="클라우드이용"/>
          <el-table-column prop="na3" label="개인정보"/>
          <el-table-column prop="na4" label="신용정보"/>
          <el-table-column prop="na5" label="광고정보"/>
          <el-table-column prop="na6" label="위치정보"/>
        </el-table>
      </div>
    </div>
    <div>
      <div class="white-box">
        <BaseButtonTab
          v-model="selectedCategory"
          :tabData="categories"
          class="mb-10"
        />
        <el-form label-position="top" class="mb-20">
          <el-form-item label="내용 타이틀">
            <el-input
              v-model="textarea1"
              style="width: 100%"
              :autosize="{ minRows: 5, maxRows: 10 }"
              autosize
              type="textarea"
              placeholder="Please input"
            />
          </el-form-item>
        </el-form>

        <div class="flex end">
          <BaseButton class="black-button">결재의견 등록</BaseButton>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {ref} from 'vue';

const categories = ref(["신청내용", "분야별 점검 항목", "결재의견"]);
const selectedCategory = ref("신청내용");
</script>

<style scoped lang="scss">
@import '@/assets/styles/pages/PolicyManagement.css';
</style>