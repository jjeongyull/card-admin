<template>
  <el-select v-if="multipleUse" multiple v-model="selectedData" :placeholder="placeholder" :class="className">
    <el-option v-for="data in selectData" :key="data" :label="data" :value="data" >
      <span class="custom-option">{{ data }}</span>
    </el-option>
  </el-select>
  <el-select v-else v-model="selectedData" :placeholder="placeholder" :class="className">
    <el-option v-for="data in selectData" :key="data" :label="data" :value="data">
      <span class="custom-option">{{ data }}</span>
    </el-option>
  </el-select>
</template>

<script setup>
const selectedData = defineModel();
const props = defineProps({
  selectData: Array,
  placeholder: String,
  className: { type: String, default: "" },
  multipleUse: { type: Boolean, default: false },
});
</script>

<style scoped>
.category-select {
  width: 150px;
}
.custom-option{
  color: #000;
}
:deep(.el-select__wrapper.is-focused){
  box-shadow: 0 0 0 1px var(--el-text-color-primary,var(--el-text-color-primary)) inset;
}
:deep(.el-select) {
  color: #000 !important;
}

</style>