<template>
  <li
    class="asset-item"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <!-- 자산명 -->
    <div class="asset-title">{{ asset.name }}</div>

    <!-- 상태 + 담당자 + 날짜 -->
    <div class="asset-info">
      <div class="asset-info-inner">
        <div>
          <span class="status">{{ asset.status }}</span>&nbsp;
          <span class="managers">{{ asset.managers.join(", ") }}</span>
        </div>
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


  </li>
</template>

<script setup>
import { ref } from "vue";

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
  cursor: pointer;
}

.asset-item:hover {
  background: #FAFCFF;
}

.asset-title {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 10px;
}

.asset-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.asset-info-inner {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  display: flex;
  gap: 5px;
  flex-direction: column;
}

.status {
  font-weight: bold;
}

.date {
  color: #aaa;
}

.icon-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 7px;
  position: absolute;
  bottom: 12px;
  right: 12px;
}
.icon-btn{
  border: none;
  padding: 0;
  height: fit-content;
  margin: 0;
}
</style>
