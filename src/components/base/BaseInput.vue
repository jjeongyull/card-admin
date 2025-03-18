<template>
  <el-input
  v-model="searchQuery"
  :placeholder="placeholder"
  clearable
  />
</template>

<script setup>
const searchQuery = defineModel();
const props = defineProps({
  placeholder: String
});
</script>

<style scoped>
  :deep(.el-input__wrapper.is-focus){
    box-shadow: 0 0 0 1px var(--el-text-color-primary,var(--el-text-color-primary)) inset;
  }
</style>