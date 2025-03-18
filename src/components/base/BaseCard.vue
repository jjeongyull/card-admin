<template>
  <el-card class="custom-collapse">
    <h4 v-if="title">{{ title }}</h4>
    <slot></slot>
  </el-card>
</template>

<script setup>
const props = defineProps({
  title: String,
});

</script>

<style scoped>
.custom-collapse {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
  min-height: 116px;
}
:deep(.el-card__body){
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
