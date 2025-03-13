<template>
  <el-dialog
    :model-value="visible"
    title="해당 기간의 데이터"
    align-center
    width="400px"
    @close="closePopup"
    :close-on-click-modal="closePopup"
    class="calendar-popup"
  >
    <div class="popup-content">
      <div v-if="data.length">
        <ul class="data-list">
          <li v-for="(item, index) in data" :key="index" class="data-item">
            <el-icon class="data-icon"><Calendar /></el-icon>
            <span class="data-text">{{ item.name }} ({{ item.date }})</span>
          </li>
        </ul>
      </div>
      <div v-else class="no-data">
        <el-icon class="empty-icon"><Warning /></el-icon>
        <p>해당 기간의 데이터가 없습니다.</p>
      </div>
    </div>

    <template #footer>
      <el-button @click="closePopup">닫기</el-button>
    </template>
  </el-dialog>
</template>

<script setup>

const props = defineProps({
  visible: Boolean,
  data: { type: Array, default: () => [] },
});

const emit = defineEmits(["close"]);

const closePopup = () => {
  props.visible = false;
  emit("close", false);
};
</script>

<style scoped src="@/assets/styles/components/calendarPopup.css"></style>
