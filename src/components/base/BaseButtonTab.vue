<template>
  <el-tabs v-model="selectedData" class="custom-tabs">
    <el-tab-pane
      v-for="(data, index) in tabData"
      :key="index"
      :label="data"
      :name="data"
    ></el-tab-pane>
  </el-tabs>
</template>

<script setup>
const selectedData = defineModel();
const props = defineProps({
  tabData: Array
});
</script>

<style scoped>
:deep(.custom-tabs  .el-tabs__header) {
  margin: 0 !important;
  border-bottom: 1px solid #CDD0D6 !important;
}
:deep(.filter-header) {
  border-bottom: 1px solid #CDD0D6 !important;
}
:deep(.custom-tabs .el-tabs__header .el-tabs__item:hover) {
  color: #000 !important; /* 마우스 오버 시 검정색 */
}
:deep(.custom-tabs .el-tabs__header .el-tabs__item) {
  font-weight: bold !important;
}
:deep(.custom-tabs .el-tabs__item.is-active, .el-tabs__item:hover) {
  color: #000 !important;
}
:deep(.custom-tabs .el-tabs__active-bar){
  background-color: #000 !important;
}

</style>