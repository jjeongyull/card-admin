<template>
  <div class="sidebar-header">
    <el-button @click="toggleCollapse" class="toggle-btn" circle>
      <el-icon v-if="!isCollapsed"><ArrowLeft /></el-icon>
      <el-icon v-else><ArrowRight /></el-icon>
    </el-button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  isCollapsed: Boolean,
});

const emit = defineEmits(["toggle"]);

const toggleCollapse = () => {
  emit("toggle");
};
</script>

<style scoped>
.sidebar-header {
  padding: 10px;

}
</style>
