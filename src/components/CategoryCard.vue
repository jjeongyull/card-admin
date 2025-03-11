<template>
  <el-card class="compliance-card" :class="item.type ? item.type : ''" @click="handleClick">
    <div class="status-div" v-if="item.status">
      <span class="status-dot" :class="item.status"></span>
    </div>
    <div class="card-header">
      <p class="card-title">{{ item.title }}</p>
      <div v-if="item.status" class="card-date">{{ item.date }}</div>
      <div v-else class="card-date"><el-icon><Plus /></el-icon></div>
    </div>
  </el-card>
</template>

<script setup>

const props = defineProps({
  item: Object,
});


const handleClick = () => {
  console.log(props.item)
  if (props.item.click) {
    props.item.click()
  }
};
</script>

<style scoped>
.compliance-card.black {
  background: #000;
  color: #fff;
  padding: 25px 15px;
}
/* 개별 카드 */
.compliance-card {
  padding: 15px;
  border-radius: 8px;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  height: 110px;
  position: relative;
  cursor: pointer;
}

/* 카드 내부 스타일 */
.card-header {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.card-title {
  font-weight: bold;
}

.card-date {
  font-size: 0.85rem;
  color: gray;
}

/* 상태 표시 점 */
.status-div{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: block;
}

.status-dot.green {
  background-color: green;
}

.status-dot.yellow {
  background-color: yellow;
}

.status-dot.red {
  background-color: red;
}
</style>

<style>
.compliance-card .el-card__body {
  padding: 0 !important;
  height: calc(100% - 10px);
}
</style>