<template>
  <div
    class="asset-item"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <!-- 자산명 -->
    <div class="asset-title">{{ asset.name }}</div>

    <!-- 상태 + 담당자 + 날짜 -->
    <div class="asset-info">
      <span class="status">{{ asset.status }}</span>
      <span class="managers">{{ asset.managers.join(", ") }}</span>
      <span class="date">{{ asset.date }}</span>
    </div>

    <!-- 호버 시 아이콘 버튼 표시 -->
    <div class="icon-buttons" v-if="hover">
      <BaseButton class="icon-btn" @click="emit('history-click', asset)">
        <el-icon><Clock /></el-icon>
      </BaseButton>
      <BaseButton class="icon-btn" @click="emit('edit-click', asset)">
        <el-icon><Edit /></el-icon>
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseButton from "@/components/base/BaseButton.vue";

defineProps({
  asset: Object
});

const emit = defineEmits(["history-click", "edit-click"]);
const hover = ref(false);
</script>

<style scoped>
.asset-item {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  position: relative;
  transition: background 0.2s ease-in-out;
}

.asset-item:hover {
  background: #f5f5f5;
}

.asset-title {
  font-weight: bold;
}

.asset-info {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  display: flex;
  gap: 5px;
}

.status {
  font-weight: bold;
}

.date {
  margin-left: auto;
  color: #aaa;
}

.icon-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
}
.icon-btn{
  border: none;
  padding: 0;
  height: fit-content;
}
</style>
