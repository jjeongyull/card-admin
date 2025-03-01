<template>
  <div class="tree-container">
    <!-- 필터 입력란 -->
    <el-input
      v-model="filterText"
      placeholder="노드 필터"
      clearable
    />

    <!-- 트리 컴포넌트 -->
    <div class="tree-wrapper">
      <el-tree
        ref="treeRef"
        :data="formattedTreeData"
        :props="defaultProps"
        highlight-current
        :filter-node-method="filterNode"
        node-key="menuId"
        :default-expand-all="false"
        draggable
        @node-drop="handleNodeDrop"
      >
        <!-- 커스텀 노드 템플릿 -->
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span class="node-actions">
              <!-- 팝업 메뉴 컴포넌트 사용 -->
              <PopupMenu
                :menu-items="treeMenuItems"
                @command="(command) => handleCommand(command, data)"
              />
            </span>
          </span>
        </template>
      </el-tree>
    </div>

    <!-- 편집 다이얼로그 -->
    <el-dialog v-model="editDialogVisible" title="노드 편집" width="30%">
      <el-input v-model="editNodeLabel" />
      <template #footer>
        <el-button @click="editDialogVisible = false">취소</el-button>
        <el-button type="primary" @click="saveEdit">저장</el-button>
      </template>
    </el-dialog>

    <!-- 추가 다이얼로그 -->
    <el-dialog v-model="addDialogVisible" title="노드 추가" width="30%">
      <el-input v-model="newNodeLabel" placeholder="새 노드 이름" />
      <template #footer>
        <el-button @click="addDialogVisible = false">취소</el-button>
        <el-button type="primary" @click="saveNewNode">저장</el-button>
      </template>
    </el-dialog>

    <!-- 데이터 상세 정보 다이얼로그 -->
    <el-dialog v-model="dataDialogVisible" title="노드 데이터" width="50%">
      <pre>{{ JSON.stringify(currentNodeData, null, 2) }}</pre>
    </el-dialog>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'
import { ElTree, ElInput, ElDialog, ElButton } from 'element-plus'
import PopupMenu from '@/components/PopupMenu.vue' // 팝업 메뉴 컴포넌트 import
import uNewCommon from "@/assets/utils/uNewCommon.js"

export default {
  name: 'TreeComponent',
  components: {
    ElTree,
    ElInput,
    ElDialog,
    ElButton,
    PopupMenu
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  emits: ['edit', 'add', 'delete', 'viewData', "update:data"],
  setup(props, { emit }) {
    const treeRef = ref(null)
    const filterText = ref('')
    const defaultProps = ref({
      children: 'children',
      label: 'label'
    })
    const editDialogVisible = ref(false)
    const addDialogVisible = ref(false)
    const dataDialogVisible = ref(false)
    const editNodeLabel = ref('')
    const newNodeLabel = ref('')
    const currentNode = ref(null)
    const currentNodeData = ref(null)
    const parentNode = ref(null)

    const treeData = ref([]);
    watch(
      () => props.data,
      (newData) => {
        treeData.value = newData;
      },
      { immediate: true, deep: true }
    );

    const formattedTreeData = computed(() =>
      uNewCommon.addLabelRecursively(
        uNewCommon.buildTree(treeData.value, "parentMenuId", "menuId", "0"),
        "menuName"
      )
    );


    console.log()





    // 트리용 메뉴 항목
    const treeMenuItems = ref([
      { command: 'edit', label: '편집' },
      { command: 'add', label: '추가' },
      { command: 'delete', label: '삭제' },
      { command: 'viewData', label: '정보보기' }
    ])

    // 노드 필터링
    const filterNode = (value, data) => {
      if (!value) return true
      return data.menuName.includes(value)
    }

    // 필터 텍스트 변경 시 트리 필터링
    watch(filterText, (val) => {
      treeRef.value.filter(val)
    })

    // 드롭다운 메뉴 핸들러
    const handleCommand = (command, data) => {
      if (command === 'edit') {
        editNodeLabel.value = data.menuName
        currentNode.value = data
        editDialogVisible.value = true
      } else if (command === 'add') {
        parentNode.value = data
        addDialogVisible.value = true
      } else if (command === 'delete') {
        emit('delete', data)
      } else if (command === 'viewData') {
        currentNodeData.value = data
        dataDialogVisible.value = true
      }
    }

    // 노드 편집 저장
    const saveEdit = () => {
      currentNode.value.menuName = editNodeLabel.value
      editDialogVisible.value = false
      emit('edit', currentNode.value)
    }

    // 새 노드 추가
    const saveNewNode = () => {
      const newId = `${parentNode.value.menuId}.${parentNode.value.children.length + 1}` // 고유 ID 생성
      const newNode = {
        menuId: newId,
        menuName: newNodeLabel.value,
        parentMenuId: parentNode.value.menuId,
        permit: { c: true, r: true, u: true, d: true },
        children: []
      }
      if (!parentNode.value.children) {
        parentNode.value.children = []
      }
      parentNode.value.children.push(newNode)
      addDialogVisible.value = false
      newNodeLabel.value = ''
      emit('add', newNode)
    }

    // 노드 드래그 앤 드롭 핸들러
    const handleNodeDrop = () => {
      emit('update:data', treeData.value)
    }

    console.log(formattedTreeData)

    return {
      treeRef,
      filterText,
      treeData,
      defaultProps,
      editDialogVisible,
      addDialogVisible,
      dataDialogVisible,
      editNodeLabel,
      newNodeLabel,
      currentNodeData,
      treeMenuItems,
      formattedTreeData,
      filterNode,
      handleCommand,
      saveEdit,
      saveNewNode,
      handleNodeDrop
    }
  }
}
</script>

<style scoped>
.tree-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 화면 전체 높이 */
}

.tree-wrapper {
  flex: 1;
  overflow-y: auto; /* 스크롤 추가 */
  max-height: calc(100vh - 100px); /* 필터 입력란과 여백 고려 */
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 10px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.node-actions {
  margin-left: 10px;
  cursor: pointer;
}
</style>