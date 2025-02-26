<template>
  <div>
    <el-table :data="tableData">
      <el-table-column prop="name" label="이름" />
      <el-table-column prop="action" label="액션">
        <template #default="{ row }">
          <PopupMenu
            :menu-items="tableMenuItems"
            @command="(command) => handleCommand(command, row)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref } from 'vue'
import PopupMenu from '@/components/PopupMenu.vue' // 팝업 메뉴 컴포넌트 import

export default {
  name: 'TableComponent',
  components: {
    PopupMenu
  },
  setup() {
    const tableData = ref([
      { id: 1, name: '테이블 항목 1' },
      { id: 2, name: '테이블 항목 2' }
    ])

    // 테이블용 메뉴 항목
    const tableMenuItems = ref([
      { command: 'edit', label: '편집' },
      { command: 'delete', label: '삭제' }
    ])

    // 드롭다운 메뉴 핸들러
    const handleCommand = (command, row) => {
      if (command === 'edit') {
        console.log('편집:', row)
      } else if (command === 'delete') {
        console.log('삭제:', row)
      }
    }

    return {
      tableData,
      tableMenuItems,
      handleCommand
    }
  }
}
</script>