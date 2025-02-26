# (2025.02.25)

### 함수에 대해서는 모두 코멘트를 달 것
#### 확인 및 처리 여부 : 
```
/**
**/
const sortTable = (key) => {
  tableData.value.sort((a, b) => (a[key] > b[key] ? 1 : -1));
};

const filterTable = (key) => {
  console.log(`필터 기능 (추후 구현) - 필터링할 키: ${key}`);
};
```
- 형식 : /** */ : jsdoc 기준
- 방법 : 함수를 먼저 만든 후 주석을 달면 자동으로 생성
```
/**
 * 설명 : 주어진 평면 배열 데이터를 트리 구조로 변환하는 함수입니다.
 *
 * 이 함수는 주어진 데이터를 `parentKey`와 `key`를 기준으로 트리 구조로 변환하고,
 * 부모 메뉴 ID가 `startMenuId`인 항목들을 찾아 트리의 루트로 설정합니다.
 * 또한, 항목들을 `sortKey`를 기준으로 정렬합니다.
 *
 * @param {Array} items - 트리 구조로 변환할 평면 배열 데이터입니다.
 * @param {string} parentKey - 부모 항목의 ID를 나타내는 키입니다.
 * @param {string} key - 각 항목의 고유 ID를 나타내는 키입니다.
 * @param {string} startMenuId - 트리 구조의 루트로 설정할 부모 항목의 ID입니다.
 * @param {string} [sortKey='sort'] - 항목들을 정렬할 키입니다. 기본값은 `'sort'`입니다.
 *
 * @returns {Array} 트리 구조로 변환된 배열을 반환합니다.
 *
 * @example
 * const flatData = [
 *   { menuId: '1', parentMenuId: '0', sort: 1 },
 *   { menuId: '2', parentMenuId: '0', sort: 2 },
 *   { menuId: '3', parentMenuId: '1', sort: 1 },
 *   { menuId: '4', parentMenuId: '1', sort: 2 },
 * ];
 * const treeData = buildTree(flatData, 'parentMenuId', 'menuId', '0');
 * console.log(treeData);
 *
 * // 결과:
 * [
 *   {
 *     menuId: '1',
 *     parentMenuId: '0',
 *     sort: 1,
 *     children: [
 *       { menuId: '3', parentMenuId: '1', sort: 1, children: [] },
 *       { menuId: '4', parentMenuId: '1', sort: 2, children: [] }
 *     ]
 *   },
 *   {
 *     menuId: '2',
 *     parentMenuId: '0',
 *     sort: 2,
 *     children: []
 *   }
 * ]
 */
```

# (2025.02.26)

### 모든 컴포넌트는 element-plus 기준으로 할 것
#### 확인 및 처리 여부 : 


# (2025.02.26)

### 메시지 상자 출력을 컴포넌트로 작성 후 동적으로 호출 하려면
#### 확인 및 처리 여부 : 
##### 컴포넌트를 만들고, props를 통해 메시지, 제목, 버튼 텍스트, 콜백 등을 동적으로 설정.
##### 확인 버튼 클릭 시 confirmed 이벤트가 부모 컴포넌트로 전달되며, 이를 이용해 추가적인 동작을 수행
1. 버튼이 1개인 경우 (buttonText: ['확인']) → ElMessageBox.alert() 사용
2. 버튼이 2개인 경우 (buttonText: ['취소', '확인']) → ElMessageBox.confirm() 사용
3. 클릭 이벤트를 부모 컴포넌트에서 @confirmed, @canceled로 받을 수 있음
4. HTML 메시지를 사용할 수 있도록 bUseHTMLString 옵션 지원
- 메시지상자 컴포넌트 : cMessageBox.vue
```
<template>
  <div>
    <el-button plain @click="showMessageBox">{{ buttonText[1] || buttonText[0] }}</el-button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'

const props = defineProps({
  message: { type: String, required: true }, // 메시지 내용
  title: { type: String, default: '알림' }, // 제목 (기본값 설정)
  buttonText: { type: Array as () => string[], default: () => ['확인'] }, // 버튼 목록 (1개 또는 2개)
  bUseHTMLString: { type: Boolean, default: false }, // HTML 사용 여부
})

const emit = defineEmits(['confirmed', 'canceled']) // 클릭 이벤트를 부모로 전달

const showMessageBox = () => {
  if (props.buttonText.length === 2) {
    // 버튼이 2개일 경우 (취소 / 확인)
    ElMessageBox.confirm(props.message, props.title, {
      confirmButtonText: props.buttonText[1], // 확인 버튼
      cancelButtonText: props.buttonText[0], // 취소 버튼
      bUseHTMLString: props.bUseHTMLString,
    })
      .then(() => {
        emit('confirmed') // 확인 클릭 시 부모 컴포넌트에 이벤트 전달
        ElMessage({ type: 'success', message: 'Confirmed' })
      })
      .catch(() => {
        emit('canceled') // 취소 클릭 시 부모 컴포넌트에 이벤트 전달
        ElMessage({ type: 'info', message: 'Canceled' })
      })
  } else {
    // 버튼이 1개일 경우 (확인만 있음)
    ElMessageBox.alert(props.message, props.title, {
      confirmButtonText: props.buttonText[0], // 확인 버튼만 사용
      bUseHTMLString: props.bUseHTMLString,
      callback: () => {
        emit('confirmed')
        ElMessage({ type: 'info', message: 'Confirmed' })
      },
    })
  }
}
</script>
```
- 일반 메시지 박스 출력 시
```
<template>
  <MessageBox 
    message="This is a simple alert message" 
    title="Alert"
    :buttonText="['확인']"
    @confirmed="handleConfirm"
  />
</template>

<script lang="ts" setup>
import MessageBox from '@/components/MessageBox.vue'

const handleConfirm = () => {
  console.log('User clicked Confirm')
}
</script>
```
- 버튼이 2개 일 경우
```
<template>
  <MessageBox 
    message="Do you want to proceed?" 
    title="Confirmation"
    :buttonText="['취소', '확인']"
    @confirmed="handleConfirm"
    @canceled="handleCancel"
  />
</template>

<script lang="ts" setup>
import MessageBox from '@/components/MessageBox.vue'

const handleConfirm = () => {
  console.log('User clicked Confirm')
}

const handleCancel = () => {
  console.log('User clicked Cancel')
}
</script>
```
- HTML 메시지를 포함한 메시지 박스 출력 시
```
<template>
  <MessageBox 
    message="<strong>HTML 메시지 예제</strong><br/><i>여기에 HTML을 추가할 수 있습니다.</i>" 
    title="HTML Message"
    confirmButtonText="확인"
    :buttonText="['확인']"
    :bUseHTMLString="true"
    @confirmed="handleConfirm"
  />
</template>
```

##이력 타임 라인 출력 인터페이스 (2025.02.27)
```
<template>
  <div class="max-w-2xl mx-auto p-5">
    <h2 class="text-xl font-semibold mb-4">이력 타임라인</h2>

    <el-timeline>
      <el-timeline-item
        v-for="(event, index) in timelineData"
        :key="index"
        :timestamp="event.date"
        placement="top"
        :color="event.color"
      >
        <el-card>
          <h3 class="text-lg font-semibold">{{ event.title }}</h3>
          <p class="text-gray-700">{{ event.description }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const timelineData = ref([
  { date: "2024-02-27", title: "프로젝트 시작", description: "프로젝트가 공식적으로 시작되었습니다.", color: "#409EFF" },
  { date: "2024-03-10", title: "기능 개발", description: "핵심 기능 개발이 완료되었습니다.", color: "#67C23A" },
  { date: "2024-04-05", title: "테스트 완료", description: "기능 테스트를 성공적으로 마쳤습니다.", color: "#E6A23C" },
  { date: "2024-05-01", title: "배포 완료", description: "서비스가 정식으로 배포되었습니다.", color: "#F56C6C" }
]);
</script>
```

## 팝업 화면 - 반응형, 높이 제한 (2025.02.27)
```
<template>
  <el-button type="primary" @click="dialogVisible = true">업무 수정</el-button>

  <el-dialog
    v-model="dialogVisible"
    title="업무 수정"
    :style="dialogStyle"
    :close-on-click-modal="false"
  >
    <div class="dialog-content">
      <el-form label-width="100px">
        <!-- 업무명 -->
        <el-form-item label="업무명">
          <el-input v-model="task.name" />
        </el-form-item>

        <!-- 운영 -->
        <el-form-item label="운영">
          <el-select v-model="task.operation" placeholder="운영 선택">
            <el-option label="운영" value="운영" />
            <el-option label="개발" value="개발" />
          </el-select>
        </el-form-item>

        <!-- 대내 / 대외 -->
        <el-form-item label="대내 / 대외">
          <el-radio-group v-model="task.internal">
            <el-radio label="대내">대내</el-radio>
            <el-radio label="대외">대외</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 업무 테이블 -->
        <el-form-item label="업무 분류">
          <el-table :data="task.categories" border style="width: 100%">
            <el-table-column prop="category" label="분류" />
            <el-table-column prop="count" label="개수" />
          </el-table>
        </el-form-item>

        <!-- 담당자 -->
        <el-form-item label="담당자">
          <el-input v-model="newMember" placeholder="담당자 입력 후 Enter" @keyup.enter="addMember" />
          <div class="tag-container">
            <el-tag
              v-for="(member, index) in task.members"
              :key="index"
              closable
              @close="removeMember(index)"
              class="tag-item"
            >
              {{ member }}
            </el-tag>
          </div>
        </el-form-item>

        <!-- 파일 업로드 -->
        <el-form-item label="첨부파일">
          <el-upload
            class="upload-demo"
            drag
            action="#"
            multiple
            :auto-upload="false"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">파일을 여기에 드래그하거나 <em>여기를 클릭해주세요</em></div>
            <template #tip>
              <div class="el-upload__tip">jpg/png 파일만 허용 (최대 500KB)</div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="deleteTask">삭제</el-button>
        <el-button @click="dialogVisible = false">취소</el-button>
        <el-button type="primary" @click="saveTask">수정완료</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";

const dialogVisible = ref(false);

const task = ref({
  name: "Dive",
  operation: "운영",
  internal: "대내",
  categories: [
    { category: "웹", count: 3 },
    { category: "앱", count: 7 },
    { category: "서버 (OS)", count: 16 },
    { category: "데이터베이스", count: 2 },
    { category: "WEB / WAS", count: 3 },
  ],
  members: ["관리자", "강민호"],
});

const newMember = ref("");

const addMember = () => {
  if (newMember.value && !task.value.members.includes(newMember.value)) {
    task.value.members.push(newMember.value);
    newMember.value = "";
  }
};

const removeMember = (index) => {
  task.value.members.splice(index, 1);
};

const deleteTask = () => {
  console.log("삭제 실행");
  dialogVisible.value = false;
};

const saveTask = () => {
  console.log("저장 실행", task.value);
  dialogVisible.value = false;
};

// 반응형 스타일 적용
const dialogStyle = computed(() => ({
  width: window.innerWidth < 768 ? "90%" : "600px",
  height: "60vh",
  "max-width": "90vw",
}));
</script>

<style scoped>
.dialog-content {
  max-height: 50vh;
  overflow-y: auto;
  padding-right: 10px;
}

.dialog-footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

/* 태그 스타일 */
.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.tag-item {
  background-color: #f2f2f2;
  color: #333;
  padding: 4px 8px;
  border-radius: 4px;
}

/* 반응형 처리 */
@media (max-width: 768px) {
  .dialog-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .dialog-footer el-button {
    width: 100%;
    margin-bottom: 8px;
  }
}
</style>

```

## el-tree컴포넌트, 테이블컴포넌트에 팝업메뉴 컴포넌트를 각각 출력하는 방법
### el-tree 노드에 currentNodeData에 부가정보가 json 구조로 저장
```
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
```