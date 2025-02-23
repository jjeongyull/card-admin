<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column
      v-for="column in tableColumns"
      :key="column.prop"
      :prop="column.prop"
      :label="column.label"
      :width="column.width"
      :show-overflow-tooltip="column.tooltip"
    >
      <!-- 헤더 영역 -->
      <template #header>
        <div class="header-with-menu">
          {{ column.label }}
          <el-dropdown trigger="click">
            <el-icon class="header-menu"><More /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="sortTable(column.prop)">정렬</el-dropdown-item>
                <el-dropdown-item @click="filterTable(column.prop)">필터</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </template>

      <!-- 데이터 영역 -->
      <template #default="{ row }">
        <template v-if="column.prop === 'status'">
          <div class="status-container">
            <el-tag :type="getStatusTag(row[column.prop])">
              {{ row[column.prop] }}
            </el-tag>
            <span class="status-icon" :class="getStatusClass(row[column.prop])">!</span>
          </div>
        </template>
        <template v-else>
          <el-tooltip effect="dark" :content="row[column.prop]" placement="top">
            <span class="ellipsis">{{ row[column.prop] }}</span>
          </el-tooltip>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref } from 'vue';
import { More } from '@element-plus/icons-vue';

defineProps({
  tableColumns: Array, // 부모에서 전달받을 컬럼 정의
  tableData: Array, // 부모에서 전달받을 데이터
});

const sortTable = (key) => {
  tableData.value.sort((a, b) => (a[key] > b[key] ? 1 : -1));
};

const filterTable = (key) => {
  console.log(`필터 기능 (추후 구현) - 필터링할 키: ${key}`);
};

const getStatusTag = (status) => {
  switch (status) {
    case '조치완료':
      return 'success';
    case '조치필요':
      return 'warning';
    case '조치지연':
      return 'danger';
    default:
      return '';
  }
};

const getStatusClass = (status) => {
  switch (status) {
    case '조치완료':
      return 'status-success';
    case '조치필요':
      return 'status-warning';
    case '조치지연':
      return 'status-danger';
    default:
      return '';
  }
};
</script>

<style scoped>
.header-with-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-menu {
  cursor: pointer;
  font-size: 16px;
  color: #999;
  margin-left: 5px;
}

.status-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
  color: white;
}

.status-success {
  background-color: #67c23a; /* 초록색 */
}

.status-warning {
  background-color: #e6a23c; /* 노란색 */
}

.status-danger {
  background-color: #f56c6c; /* 빨간색 */
}
</style>
