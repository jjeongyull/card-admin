<template>
  <div class="table-wrapper custom-table">
    <el-table
      :data="paginatedData"
      stripe
      :max-height="500"
      style="width: 100%"
      :height="filteredData.length ? 'auto' : '100px'"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
    >
      <!--
        체크박스 컬럼 (선택 가능)
        cheackValue의 값에 따라 활성화
      -->
      <el-table-column v-if="cheackValue" type="selection" width="55" />

      <el-table-column
        v-for="column in tableColumns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :sortable="column.sortable"
        :align="column.align || 'center'"
        sortable
      >
        <template #header>
          <div class="header-with-menu">
            {{ column.label }}

          </div>
          <!-- <el-dropdown trigger="click">
              <el-icon class="header-menu"><More /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="sortTable(column.prop)">정렬</el-dropdown-item>
                  <el-dropdown-item @click="filterTable(column.prop)">필터</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown> -->
        </template>

        <template #default="{ row }">
          <div @click="handleCellClick(column.prop, row)" class="cell-content">
            <template v-if="column.prop === 'status'">
              <div class="status-container">
                <el-tag effect="dark" :type="getStatusTag(row[column.prop])">
                  {{ row[column.prop] }}
                </el-tag>
              </div>
            </template>
            <template v-else-if="column.prop === 'level'">
              <div class="status-container">
                <el-tag effect="dark" :type="getStatusTag(row[column.prop])">
                  {{ row[column.prop] }}
                </el-tag>
              </div>
            </template>
            <template v-else-if="column.prop === 'percent'">
              <div class="table-progress-div">
                <p>{{ row[column.prop] }}</p>
                <progress class="table-progress-bar" :value="row[column.prop].replace('%', '')" max="100"></progress>
              </div>
            </template>
            <template v-else-if="column.prop === 'target'">
              <div class="status-container">
                <el-tag v-for="item in row[column.prop].split(',')" effect="dark" type="info">
                  {{ item }}
                </el-tag>
                <!-- <span class="status-icon" :class="getStatusClass(row[column.prop])"></span> -->
              </div>
            </template>
            <template v-else-if="column.prop === 'history'">
              <BaseButton class="white-button" @click="emit('history-click', row)">
                <el-icon><Refresh /></el-icon>
              </BaseButton>
            </template>
            <template v-else-if="column.prop === 'actions'">
              <BaseButton class="white-button" @click="emit('actions-click', row)">
                <el-icon><Setting /></el-icon>
              </BaseButton>
            </template>
            <template v-else-if="column.prop === 'update'">
              <BaseButton class="info-button" @click="emit('actions-click', row)">
                <el-icon><Edit /></el-icon>
              </BaseButton>
            </template>
            <template v-else-if="column.prop === 'record'">
              <BaseButton class="info-button" @click="emit('history-click', row)">
                <el-icon><Document /></el-icon>
              </BaseButton>
            </template>
            <template v-else-if="column.prop === 'vulnerable'">
              <BaseButton class="black-button" @click="emit('confrim-click')">
                확인
              </BaseButton>
            </template>
            <template v-else-if="column.prop === 'evidence'">
              <BaseButton class="black-button" @click="emit('actions-click', row)">
                등록
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

    <!-- 페이지네이션 (수정된 부분) -->
    <el-pagination
      v-if="pageUse"
      class="padeDiv"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next"
      :total="filteredData.length"
      :page-sizes="[5, 10, 20, 50]"
      @update:current-page="updatePage"
      @update:page-size="updatePageSize"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
// import { More } from "@element-plus/icons-vue";

const props = defineProps({
  tableColumns: Array, // 컬럼 정의
  cheackValue: { type: Boolean, default: false }, // 체크박스 컬럼
  pageUse: { type: Boolean, default: true }, // 페이지네이션 사용 여부
  tableData: Array, // 필터링 된 데이터 (필터링 후 데이터)
  allData: Array, // 전체 테이블 데이터 (필터링 전 데이터)
  pageSize: { type: Number, default: 10 }, // 페이지당 표시할 개수
  currentPage: { type: Number, default: 1 }, // 현재 페이지
  filters: { type: Object, default: () => ({}) }, // 필터링 조건
});

const emit = defineEmits([
  "row-click", "cell-click", "sort", "filter",
  "update:currentPage", "update:pageSize",
  "history-click", "actions-click", "selected-rows",
  "confrim-click"
]);

// 현재 페이지 상태 (props 값이 변경 가능하도록 ref 사용)
const currentPage = ref(props.currentPage);
const pageSize = ref(props.pageSize);

// 필터링된 데이터
const filteredData = computed(() => {
  if (!props.filters || Object.keys(props.filters).length === 0) {
    return props.tableData; // 필터 없으면 전체 데이터 반환
  }

  return props.tableData.filter(row => {
    return Object.entries(props.filters).every(([key, value]) => {
      if (!value) return true; // 필터 값 없으면 통과
      return String(row[key]).toLowerCase().includes(String(value).toLowerCase());
    });
  });
});

// 페이지네이션 적용된 데이터
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredData.value.slice(start, end);
});

// 페이지 변경 이벤트 (부모에 업데이트 이벤트 전달)
const updatePage = (page) => {
  currentPage.value = page;
  emit("update:currentPage", page);
};

// 페이지 크기 변경 이벤트
const updatePageSize = (size) => {
  pageSize.value = size;
  emit("update:pageSize", size);
  updatePage(1); // 페이지 크기 변경 시 첫 페이지로 이동
};

// 정렬 기능
// const sortTable = (key) => {
//   emit("sort", key);
// };

// 필터 기능
// const filterTable = (key) => {
//   emit("filter", key);
// };

// 행 클릭 이벤트
const handleRowClick = (row) => {
  emit("row-click", row);
};

// 셀 클릭 이벤트
const handleCellClick = (column, row) => {
  emit("cell-click", { column, row });
};

// 선택된 행 변경 시 이벤트 처리
const selectedRows = ref([]);
const handleSelectionChange = (rows) => {
  selectedRows.value = rows;
  emit("selected-rows", rows);
};

// 상태별 태그 색상 반환
const getStatusTag = (status) => {
  switch (status) {
    case "운영":
    case "조치완료":
    case "하":
      return "success";
    case "준비":
    case "조치지연":
    case "중":
      return "warning";
    case "폐기":
    case "조치필요":
    case "상":
      return "danger";
    default:
      return "primary";
  }
};
</script>

<style scoped lang="scss" src="@/assets/styles/components/BaseTable.scss"></style>
