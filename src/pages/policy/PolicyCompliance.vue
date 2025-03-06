<template>
  <div class="compliance-container">
    <!-- 필터 헤더 -->
    <div class="filter-header">
      <h2 class="title">컴플라이언스 리스트</h2>
      <div class="filter-actions">
        <el-select v-model="selectedCategory" placeholder="전체" class="category-select">
          <el-option v-for="category in categories" :key="category" :label="category" :value="category" />
        </el-select>
        <el-button class="black-button">
          카테고리 등록 +
        </el-button>
      </div>
    </div>

    <!-- 카드 리스트 -->
    <el-row :gutter="20" class="card-grid">
      <!-- 신규 컴플라이언스 -->
      <el-col :xs="24" :sm="12" :md="6" :lg="4">
        <CategoryCard :item="{title: '신규 컴플라이언스', type:'black'}" />
      </el-col>

      <!-- 리스트 데이터 -->
      <el-col v-for="(item, index) in filteredList" :key="index" :xs="24" :sm="12" :md="6" :lg="4">
        <CategoryCard :item="item" />
      </el-col>
    </el-row>


  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import CategoryCard from "../../components/CategoryCard.vue";

const categories = ref(["전체", "정보보안", "ESG", "내부 통제"]);
const selectedCategory = ref("전체");

const complianceList = ref([
  { title: "상시평가", date: "4.23년", status: "yellow", category: "정보보안" },
  { title: "보안성심의 컴플라이언스", date: "4.23년", status: "green", category: "정보보안" },
  { title: "전자금융기반시설", date: "4.23년", status: "yellow", category: "ESG" },
  { title: "ISMS-P", date: "4.23년", status: "yellow", category: "정보보안" },
  { title: "개인정보보호테마점검", date: "4.23년", status: "yellow", category: "정보보안" },
  { title: "모의해킹", date: "4.23년", status: "green", category: "정보보안" },
  { title: "ISO27001", date: "4.23년", status: "yellow", category: "ESG" },
  { title: "PCI-DSS", date: "4.23년", status: "red", category: "정보보안" },
  { title: "K-ESG가이드라인", date: "4.23년", status: "green", category: "ESG" },
  { title: "정보보호의날(본사)", date: "4.23년", status: "green", category: "ESG" },
  { title: "주요정보통신기반시설", date: "4.23년", status: "green", category: "정보보안" },
  { title: "bnk내규", date: "4.23년", status: "green", category: "정보보안" },
  { title: "신규 ISMS", date: "4.23년", status: "red", category: "정보보안" },
]);

const filteredList = computed(() => {
  if (selectedCategory.value === "전체") return complianceList.value;
  return complianceList.value.filter(item => item.category === selectedCategory.value);
});
</script>

<style scoped>
/* 전체 레이아웃 */
.compliance-container {
  flex: 1;
}

/* 필터 헤더 */
.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 1rem;
  font-weight: bold;
}

.filter-actions {
  display: flex;
  gap: 10px;
}

/* 카테고리 선택 */
.category-select {
  width: 150px;
}

/* 카테고리 추가 버튼 */
.category-add {
  background-color: black;
  color: white;
}
</style>
