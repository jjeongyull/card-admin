<template>
  <div class="table-header">
    <div class="header-actions">
      <el-dropdown>
        <el-button type="text"><el-icon class="custom-set"><Setting /></el-icon></el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="(col, index) in columns" :key="index">
              <el-checkbox v-model="visibleColumns[col]">{{ col }}</el-checkbox>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <el-table :data="tableData" class="custom-table">
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column
      v-for="(col, colIndex) in visibleColumnsArray"
      :key="colIndex"
      :label="col"
    >
      <template #header>
        <div class="header-container">
          <span>{{ col }}</span>
          <el-dropdown>
            <el-button type="text">
              <el-icon><More /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="hideColumn(col)">칼럼 숨기기</el-dropdown-item>
                <el-dropdown-item>필터</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </template>
      <template #default="{ row, $index }">
        <span @click="editCell($index, col)" v-if="!row.editing[col]" class="cell-text">
          {{ row[col] || '-' }}
        </span>
        <el-input v-else v-model="row[col]" @blur="saveData($index, col)" class="cell-input" />
      </template>
    </el-table-column>

    <!-- 마지막 칼럼 고정 -->
    <el-table-column label="➕" align="center" fixed="right" class="sticky-add-column" width="70">
      <template #header>
        <el-button @click="addColumn">
          <el-icon><Plus /></el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button class="table-plus" @click="addRow">+ 행 추가</el-button>
</template>

<script setup>
  import { computed, ref } from "vue";

  const columns = ref(["제목", "설명", "담당자"]);
  const visibleColumns = ref(columns.value.reduce((acc, col) => ({ ...acc, [col]: true }), {}));
  const tableData = ref([
    { 제목: "버그 수정", 설명: "UI 깨짐 문제 해결", 담당자: "홍길동", editing: {} },
    { 제목: "기능 추가", 설명: "새로운 필터 기능 구현", 담당자: "이순신", editing: {} },
  ]);

  const visibleColumnsArray = computed(() => columns.value.filter((col) => visibleColumns.value[col]));

  const addRow = () => {
    const newRow = { editing: {} };
    columns.value.forEach((col) => {
      newRow[col] = "";
    });
    tableData.value.push(newRow);
  };

  const addColumn = () => {
    const newColumn = prompt("추가할 컬럼 이름:");
    if (newColumn && !columns.value.includes(newColumn)) {
      columns.value.push(newColumn);
      visibleColumns.value[newColumn] = true;
      tableData.value.forEach((row) => {
        row[newColumn] = "";
      });
    }
  };

  const hideColumn = (col) => {
    visibleColumns.value[col] = false;
  };

  const editCell = (rowIndex, column) => {
    tableData.value[rowIndex].editing[column] = true;
  };

  const saveData = (rowIndex, column) => {
    tableData.value[rowIndex].editing[column] = false;
    console.log("저장된 데이터:", tableData.value[rowIndex][column]);
  };
</script>

<style scoped>
  .table-container {
    position: relative;
    overflow-x: auto;
  }
  .custom-table table{
    width: max-content !important;
  }
  .table-wrapper {
    overflow-x: auto;
  }
  .jira-table {
    font-size: 14px;
  }
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .table-plus{
    width: 100%;
    justify-content: flex-start;
    border-top: none;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    border-left: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    padding: 20px 20px;
  }
  .cell-text {
    display: block;
    padding: 5px;
    cursor: pointer;
  }
  .cell-input {
    border: none;
    background: transparent;
    padding: 5px;
  }
  .cell-input:focus {
    border: 1px solid #409eff;
    background: white;
  }
  .custom-set{
    font-size: 24px;
  }
  .header-actions{
    margin-left: auto;
    width: fit-content;
    padding: 0 10px;
  }
</style>


