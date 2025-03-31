

<template>
  <el-dialog
    v-model="dialogVisible"
    title="점검그룹 추가"
    :width="dialogWidth"
    :close-on-click-modal="false"
    class="custom-dialog"
    align-center
    @close="closeDialog"
  >
    <el-scrollbar class="no-x-scroll">
      <div class="modal-body">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="12">
            <el-radio-group v-model="activeTab" class="mb-20 full-width">
              <el-radio-button
                v-for="(status, index) in TabList"
                :key="index"
                :label="status"
                :value="status"
                class="flex-button"
                />
            </el-radio-group>

            <el-row :gutter="10" class="mb-20">
              <el-col :xs="12" :sm="6" :md="4">
                <BaseSelect
                  v-model="selectValue"
                  placeholder="자산명"
                  style="width: 100%;"
                  :selectData="assetsSelectList"
                />
              </el-col>
              <el-col :xs="12" :sm="6" :md="15">
                <el-input v-model="searchValue" placeholder="자산 / HOST / IP" />
              </el-col>
              <el-col :xs="12" :sm="6" :md="5">
                <BaseButton @click="createSelectData" class="black-button" style="width: 100%;">점검 대상으로 추가&nbsp;&nbsp;<el-icon><Plus/></el-icon></BaseButton>
              </el-col>
            </el-row>

            <BaseTable
              :tableColumns="tableColumns"
              :tableData="tableData"
              :allData="tableData"
              @cell-click=""
              @sort=""
              :currentPage="currentPage"
              :pageSize="pageSize"
              @update:currentPage="updateCurrentPage"
              :cheackValue="true"
              @history-click=""
              @actions-click=""
              @selected-rows="tableCheck"
            />
          </el-col>

          <el-col :xs="24" :sm="24" :md="12">
            <p class="mb-20">총 {{ selectCount }}건</p>

            <el-row :gutter="10" class="mb-20">
              <el-col :xs="12" :sm="6" :md="4">
                <BaseSelect
                  v-model="newSelectValue"
                  placeholder="자산명"
                  style="width: 100%;"
                  :selectData="assetsSelectList"
                />
              </el-col>
              <el-col :xs="12" :sm="6" :md="19">
                <el-input v-model="newSearchValue" placeholder="자산 / HOST / IP" />
              </el-col>
              <el-col :xs="12" :sm="6" :md="1">
                <BaseButton @click="delSelectList" class="white-button" style="width: 100%;"><el-icon><Delete/></el-icon></BaseButton>
              </el-col>
            </el-row>

            <BaseTable
              :tableColumns="tableColumns"
              :tableData="newDataList"
              :allData="newDataList"
              @cell-click=""
              @sort=""
              :pageUse="false"
              :cheackValue="true"
              @history-click=""
              @actions-click=""
              @selected-rows="newTableCheck"
            />

          </el-col>

        </el-row>
      </div>
    </el-scrollbar>

    <!-- 하단 버튼 -->
    <template #footer>
      <div class="dialog-footer">
        <BaseButton class="white-button" @click="closeDialog">취소</BaseButton>
        <BaseButton @click="insertInspectAsset" class="black-button">점검그룹 등록</BaseButton>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { uNewMessageBox } from '@/utils';

const selectCount = ref(0);

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  tableList: Array
});
const emit = defineEmits(["close", "result"]);
// 다이얼로그의 상태 동기화
const dialogVisible = ref(false);
watch(() => props.visible, (val) => {
  dialogVisible.value = val;
});
const closeDialog = () => {
  dialogVisible.value = false;
  emit("close", false);
};

const currentPage = ref(1);
const pageSize = ref(5); // 한 페이지에 표시할 개수

// 테이블 헤더 데이터
const tableColumns = [
  { label: '상태', prop: 'status' },
  { label: '유형', prop: 'type' },
  { label: '자산 구분', prop: 'asset' },
  { label: 'HOST', prop: 'host' },
  { label: 'IP', prop: 'ip' },
  { label: 'APP 담당자', prop: 'appManager' },
  { label: 'INFRA 담당자', prop: 'infraManager' },
];
const tableData = [
  { id: 1, status: '운영', type: '데이터베이스', asset: 'NGINX', host: 'SCM', ip: '123.456.789', appManager: '미지정', infraManager: '현업 담당자2'},
  { id: 2, status: '운영', type: '데이터베이스', asset: 'NGINX', host: 'SCM', ip: '123.456.789', appManager: '미지정', infraManager: '현업 담당자2' },
  { id: 3, status: '운영', type: '데이터베이스', asset: 'NGINX', host: 'SCM', ip: '123.456.789', appManager: '미지정', infraManager: '현업 담당자2'},
  { id: 4, status: '준비', type: '데이터베이스', asset: 'NGINX', host: 'SCM', ip: '123.456.789', appManager: '미지정', infraManager: '현업 담당자2' },
  { id: 5, status: '종료', type: '데이터베이스', asset: 'NGINX', host: 'SCM', ip: '123.456.789', appManager: '미지정', infraManager: '현업 담당자2' },
  { id: 6, status: '운영', type: '데이터베이스', asset: 'NGINX', host: 'SCM', ip: '123.456.789', appManager: '미지정', infraManager: '현업 담당자2' },
  { id: 7, status: '운영', type: '데이터베이스', asset: 'NGINX', host: 'SCM', ip: '123.456.789', appManager: '미지정', infraManager: '현업 담당자2' },
  { id: 8, status: '종료', type: '데이터베이스', asset: 'NGINX', host: 'SCM', ip: '123.456.789', appManager: '미지정', infraManager: '현업 담당자2' },
];

// 반응형 다이얼로그 크기 설정
const dialogWidth = ref("90vw");

// radio list 데이터
const activeTab = ref('전체')
const TabList = ref(['전체', '서버(OS)', '데이터베이스', '네트워크', '보안장비', 'WEB/WAS', '전문', '웹', '앱']);

// 검색 데이터들
const selectValue = ref('');
const newSelectValue = ref('');
const assetsSelectList = ['자산1', '자산2'];

const searchValue = ref('');
const newSearchValue = ref('');

// 점검 대상으로 추가할 테이블 선택 및 리스트
const selectedList = ref([]);
const tableCheck = (row) => {
  selectedList.value = (row);
  console.log(selectedList.value)
}

const newDataList = ref([]);
const createSelectData = () => {
  newDataList.value = selectedList.value;
  selectedList.value = [];
}

const newselectedList = ref([]);
const newTableCheck = (row) => {
  newselectedList.value = (row);
}
// 점검대상 삭제
const delSelectList = () => {
  newDataList.value = newDataList.value.filter((items) => {
    for(let i = 0; i < newselectedList.value.length; i++){
      if(Number(items.id) !== Number(newselectedList.value[i].id) ){
        return items;
      }
    }
  });
}

// 점검그룹 등록
const insertInspectAsset = () => {
  try{
    if(newDataList.value.length === 0 ){
    uNewMessageBox.showMessage({
      message: '선택한 점검그룹 항목이 없습니다.',
      type: 'error',
      position: 'center'
    });
    return;
  }
  dialogVisible.value = false;
  emit("result", newDataList.value);
  }catch(e){
    uNewMessageBox.showMessage({
      message: e.message,
      type: 'error',
      position: 'center'
    });
  }
}

</script>

<style scoped lang="scss">
@import '@/assets/styles/components/NewCompliance.css';
</style>
