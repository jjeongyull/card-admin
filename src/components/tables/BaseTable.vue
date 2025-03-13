<template>
  <div class="table-wrapper custom-table">
    <el-table
      :data="paginatedData"
      stripe
      :max-height="500"
      style="width: 100%"
      :height="tableData.length ? 'auto' : '100px'"
      @row-click="handleRowClick"
    >
      <el-table-column v-if="cheackValue" type="selection" width="55" />
      <el-table-column
        v-for="column in tableColumns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :sortable="column.sortable"
        :align="column.align || 'center'"
      >
        <!-- 헤더 -->
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

        <!-- 데이터 -->

        <template #default="{ row }">
          <div @click="handleCellClick(column.prop, row)" class="cell-content">
            <template v-if="column.prop === 'status'">
              <div class="status-container">
                <el-tag :type="getStatusTag(row[column.prop])">
                  {{ row[column.prop] }}
                </el-tag>
                <span class="status-icon" :class="getStatusClass(row[column.prop])"></span>
              </div>
            </template>
            <template v-else-if="column.prop === 'history'">
              <BaseButton type="link" @click.stop="emit('history-click', row)">
                <el-icon><Refresh /></el-icon>
              </BaseButton>
            </template>
            <template v-else-if="column.prop === 'actions'">
              <BaseButton type="link" @click.stop="emit('actions-click', row)">
                <el-icon><Setting /></el-icon>
              </BaseButton>
            </template>
            <template v-else-if="column.render">
              <span v-html="column.render(row)"></span>
            </template>
            <template v-else>
              <span class="ellipsis">{{ row[column.prop] }}</span>
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 페이지네이션 -->
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="allData.length"
      @current-change="updatePage"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { More } from "@element-plus/icons-vue";

const props = defineProps({
  tableColumns: Array, // 컬럼 정의
  cheackValue: { type: Boolean, default: false }, // 컬럼 정의
  tableData: Array, // 필터링 된 데이터
  allData: Array, // 전체 테이블 데이터
  pageSize: { type: Number, default: 10 }, // 페이지당 표시할 개수
  currentPage: { type: Number, default: 1 }, // 현재 페이지
});

const emit = defineEmits(["row-click",
  "cell-click", "sort", "filter",
  "update:currentPage", "history-click", "actions-click"
]);

// 행 클릭 이벤트
const handleRowClick = (row) => {
  emit("row-click", row);
};

// 셀 클릭 이벤트
const handleCellClick = (column, row) => {
  emit("cell-click", { column, row });
};

// 정렬 기능
const sortTable = (key) => {
  emit("sort", key);
};

// 필터 기능
const filterTable = (key) => {
  emit("filter", key);
};

// 페이지네이션 변경 이벤트
const updatePage = (page) => {
  emit("update:currentPage", page);
};

// 현재 페이지 데이터 계산
const paginatedData = computed(() => {
  const start = (props.currentPage - 1) * props.pageSize;
  const end = start + props.pageSize;
  return props.allData.slice(start, end);
});

// 상태별 태그 색상 반환
const getStatusTag = (status) => {
  switch (status) {
    case "운영":
    case "조치완료":
      return "success";
    case "준비":
    case "조치지연":
      return "warning";
    case "폐기":
    case "조치필요":
      return "danger";
    default:
      return "";
  }
};

// 상태별 아이콘 스타일 반환
const getStatusClass = (status) => {
  switch (status) {
    case "운영":
    case "조치완료":
      return "status-success";
    case "준비":
    case "조치지연":
      return "status-warning";
    case "폐기":
    case "조치필요":
      return "status-danger";
    default:
      return "";
  }
};
</script>

<style scoped>
.table-wrapper {
  width: 100%;
}

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

.cell-content {
  cursor: pointer;
  padding: 5px;
}

.status-container {
  display: flex;
  align-items: center;
  gap: 10px;
}


.status-success {
  background-color: #67c23a;
}

.status-warning {
  background-color: #e6a23c;
}

.status-danger {
  background-color: #f56c6c;
}

.ellipsis {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
:deep(.el-pagination){
  justify-content: center;
}
:deep(.el-table__body-wrapper){
  overflow-y: auto !important;
  max-height: 500px;
}
:deep(.el-table .el-table__cell){
  padding: 0;
}
</style>
