<template>
  <div class="compliance-container">
    <!-- 필터 헤더 -->
    <h2 class="title">컴플라이언스 리스트</h2>
    <div class="filter-header">

      <BaseButtonTab
        v-model="selectedCategory"
        :tabData="categories"
      />

      <div class="filter-actions">
        <BaseSelect
          v-model="selectedCategory"
          placeholder='전체'
          className="category-select"
          :selectData="categories"
        />
        <BaseButton class="black-button" @click="openCaPopup">
          카테고리 등록 +
        </BaseButton>
      </div>
    </div>

    <!-- 카드 리스트 -->
    <el-row :gutter="20" class="card-grid">
      <!-- 신규 컴플라이언스 -->
      <el-col :xs="24" :sm="12" :md="6" :lg="4">
        <CategoryCard :item="{title: '신규 컴플라이언스', type:'black'}" @click="openCompliancepup"/>
      </el-col>

      <!-- 리스트 데이터 -->
      <el-col v-for="(item, index) in filteredList" :key="index" :xs="24" :sm="12" :md="6" :lg="4">
        <CategoryCard :item="item"  @click="() => selectCategory(item.id)"/>
      </el-col>
    </el-row>

    <!-- 컴플라이언스 카테고리 추가 -->
    <ComplianceCategoryPopup
      :visible="categoryVisible"
      :selectedData="selectedCategoryData"
      @close="categoryVisible = false"
    />

    <!-- 신규 컴플라이언스 추가 -->
    <NewCompliance
      :visible="NewComplianceVisible"
      @close="NewComplianceVisible = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import CategoryCard from "../../components/CategoryCard.vue";
import ComplianceCategoryPopup from "./components/ComplianceCategoryPopup.vue";
import NewCompliance from "./components/NewCompliance.vue";

const categories = ref(["전체", "정보보안", "ESG", "내부 통제"]);
const selectedCategory = ref("전체");

const props = defineProps({
  complianceList: Array
});

const emit = defineEmits(["selectedCom"]);

const complianceList = ref(props.complianceList);

const filteredList = computed(() => {
  if (selectedCategory.value === "전체") return complianceList.value;
  return complianceList.value.filter(item => item.category === selectedCategory.value);
});

// 컴플라이언스 카테고리
const categoryVisible = ref(false);
const selectedCategoryData = ref({});
const openCaPopup = () => {
  categoryVisible.value = true;
};

// 신규 컴플라이언스
const NewComplianceVisible = ref(false);
const openCompliancepup = () => {
  NewComplianceVisible.value = true;
};

// 카테고리 페이지로 이동
const selectCategory = (id) => {
  emit("selectedCom", id);
}
</script>

<style scoped src="@/assets/styles/pages/PolicyCompliance.css"></style>
