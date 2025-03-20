<template>
  <el-timeline class="timeline">
    <el-timeline-item
      v-for="(log, index) in changeLogs"
      :key="index"
      :timestamp="formatDate(log.timestamp)"
      placement="top"
    >
      <div class="log-content">
        <div class="log-box">
          <p class="log-title">{{ log.action }}</p>
          <p class="log-user">by {{ log.user }}</p>
        </div>
      </div>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
const prop = defineProps({
  changeLogs: Array
});
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
</script>

<style scoped>
/* 타임라인 */
.timeline {
  padding-left: 5px;
  padding-right: 5px;
}

/* 로그 박스 스타일 */
.log-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.log-box {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.log-title {
  font-size: 14px;
  font-weight: bold;
  margin: 0;
}

.log-user {
  font-size: 12px;
  color: #777;
  margin-top: 4px;
}

</style>