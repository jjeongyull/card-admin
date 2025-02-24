<template>
  <el-card 
  v-for="item in filteredDetails" 
  :key="item.complianceSeq" 
  class="detail-card"
  >
    <!-- 카테고리 및 제목 -->
    <div class="card-chk">
      <el-checkbox v-model="item.checked"></el-checkbox>
      <span class="subtitle">{{ item.categoryName }}</span>
    </div>
    <div class="card-header">
      <el-tag class="dot" type="success" effect="dark"></el-tag>
      <span class="title">{{ item.categoryName }}</span>
      <div 
        class="tags"
        v-for="tagItem in item.tags" 
        :key="tagItem.itemTagSeq"
      >
        <el-tag size="small" type="info">{{ tagItem.tagName }}</el-tag>
      </div>
    </div>

    <!-- 중요도, 위험등급, 코드 정보 -->
    <div class="info">
      <div>
        <el-tag style="opacity: 0;" class="dot" type="success" effect="dark"></el-tag>
        <span>중요도 <strong>{{ item.policyLevel }}</strong></span>
        <span>위험등급 <strong class="danger">{{ item.threatLevelName }}</strong></span>
        <span>코드 {{ item.itemCode }} 대상 {{ item.target }}</span>
      </div>
      <div class="footer">
      <el-tag style="opacity: 0;" class="dot" type="success" effect="dark"></el-tag>
        <div>
          <p class="date">{{ item.regDate.substr(0, 10) }}</p>
          <p class="author">운영 | 
            <span
              v-for="(maItem, index) in item.managers"
                :key="maItem.userId"
            >
              <strong v-if="index > 0">, {{ maItem.userName }}</strong>
              <strong v-else>{{ maItem.userName }}</strong>
            </span>
            
          </p>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
  defineProps({
    filteredDetails: {
      type: Array,
      required: true
    }
  });
</script>

<style scoped>
.detail-card {
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: none;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #e7e7e7
}
.card-chk{
  display: flex;
  align-items: center;
  gap: 5px;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  font-size: 16px;
}
.tags {
  display: flex;
  gap: 5px;
}
.dot {
  font-size: 12px;
  padding: 0;
  width: 10px;
  height: 10px;
}
.info {
  font-size: 14px;
  color: #666;
  margin: 5px 0;
  display: flex;
  gap: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.subtitle {
  font-size: 12px;
  color: #888;
}
.info .danger {
  color: red;
}
.footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
}
</style>