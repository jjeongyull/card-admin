<template>
  <el-tree-select
    v-model="selectedData"
    :data="dataList"
    check-strictly
    :render-after-expand="false"
    style="width: 240px"
  />
</template>

<script setup>
  const selectedData = defineModel();
  const prop = defaultProps({
    dataList: Array,
  })
</script>