<template>
  <div class="responsive-row">
    <!-- 필터 헤더 -->
    <h2 class="title">자산정보 관리</h2>
    <div class="filter-header">
      <BaseButtonTab
        v-model="selectedCategory"
        :tabData="categories"
      />
    </div>

    <el-row :gutter="20" class="responsive-row-inner">
      <el-col :xs="24" :sm="24" :md="24">
        <div class="data-details">

          <!-- 탭 별 화면 출력 -->
          <AssetsGroupPage v-if="selectedCategory === '점검그룹'"/>
          <AssetsCategoryPage v-else-if="selectedCategory === '자산구분'"/>
          <CiaPage v-else-if="selectedCategory === 'CIA'"/>

        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import AssetsGroupPage from "./components/AssetsGroupPage.vue";
import AssetsCategoryPage from "./components/AssetsCategoryPage.vue";
import CiaPage from "./components/CiaPage.vue";

const selectedCategory = ref("점검그룹");
const categories = ['점검그룹', '자산구분', 'CIA'];

</script>

<style scoped src="@/assets/styles/pages/AssetGroup.css"></style>
