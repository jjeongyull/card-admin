<template>
  <div>
    <div class="flex-space mb-20">
      <el-radio-group v-model="activeTab" >
        <el-radio-button
          v-for="(status, index) in TabList"
          :key="index"
          :label="status"
          :value="status"
          @click="setStatusFilter(status)"
          />
      </el-radio-group>
      <BaseButton class="black-button" @click="openCiaPopup">
        등록&nbsp;<el-icon><Plus/></el-icon>
      </BaseButton>
    </div>
    <BaseTable
      :tableColumns="columns"
      :tableData="dumiData"
      :allData="dumiData"
      @cell-click=""
      @sort=""
      :currentPage="currentPage"
      :pageSize="pageSize"
      @update:currentPage="updateCurrentPage"
      :cheackValue="false"
      @history-click=""
      @actions-click="editCiaPopup"
      @selected-rows=""
    />

    <CIADialog
      :visible="ciaPopupVisible"
      @close="closeCiaPopup"
      :data="selectedData"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import CIADialog from "../dialogs/CIADialog.vue"

const activeTab = ref('기밀성');
const TabList = ref(['기밀성', '무결성', '가용성']);

const ciaPopupVisible = ref(false);
const selectedData = ref(null);
const openCiaPopup = () => {
  ciaPopupVisible.value = true;
}
const closeCiaPopup = () => {
  selectedData.value = null;
  ciaPopupVisible.value = false;
}
const editCiaPopup = (items) => {
  ciaPopupVisible.value = true;
  selectedData.value = items;
}

const currentPage = ref(1);
const pageSize = ref(10);
const updateCurrentPage = (page) => {
  currentPage.value = page;
};
const columns = ref([
  { prop: "level", label: "평가수준", width: "80" },
  { prop: "group", label: "그룹명", sortable: true },
  { prop: "update", label: "수정"},
]);
const dumiData = [
  {
    level: "하",
    group: "정보자산이 유출되는 경우 당사에 중대한 금전적 손실이 발생할 수 있는 경우",
    description: "정보자산이 유출되는 경우 당사에 중대한 금전적 손실이 발생할 수 있는 경우"
  },
  {
    level: "상",
    group: "조직 외부인이 접근 및 열람이 가능한 정보를 담고 있는 자산",
    description: "조직 외부인이 접근 및 열람이 가능한 정보를 담고 있는 자산"
  },
  {
    level: "상",
    group: "자산 소유 담당부서/담당자 이외 관련 담당부서 등 당사 내부에 관계하여 접근 및 열람이 가능한 정보를 가지고 있는 자산",
    description: "자산 소유 담당부서/담당자 이외 관련 담당부서 등 당사 내부에 관계하여 접근 및 열람이 가능한 정보를 가지고 있는 자산"
  },
  {
    level: "중",
    group: "정보자산이 유출되는 경우 당사에 중대한 금전적 손실이 발생할 수 있는 경우",
    description: "정보자산이 유출되는 경우 당사에 중대한 금전적 손실이 발생할 수 있는 경우"
  },
  {
    level: "상",
    group: "조직 외부인이 접근 및 열람이 가능한 정보를 담고 있는 자산",
    description: "조직 외부인이 접근 및 열람이 가능한 정보를 담고 있는 자산"
  },
  {
    level: "상",
    group: "자산 소유 담당부서/담당자 이외 관련 담당부서 등 당사 내부에 관계하여 접근 및 열람이 가능한 정보를 가지고 있는 자산",
    description: "자산 소유 담당부서/담당자 이외 관련 담당부서 등 당사 내부에 관계하여 접근 및 열람이 가능한 정보를 가지고 있는 자산"
  },
  {
    level: "중",
    group: "정보자산이 유출되는 경우 당사에 중대한 금전적 손실이 발생할 수 있는 경우",
    description: "정보자산이 유출되는 경우 당사에 중대한 금전적 손실이 발생할 수 있는 경우"
  },
  {
    level: "상",
    group: "조직 외부인이 접근 및 열람이 가능한 정보를 담고 있는 자산",
    description: "조직 외부인이 접근 및 열람이 가능한 정보를 담고 있는 자산"
  },
  {
    level: "상",
    group: "자산 소유 담당부서/담당자 이외 관련 담당부서 등 당사 내부에 관계하여 접근 및 열람이 가능한 정보를 가지고 있는 자산",
    description: "자산 소유 담당부서/담당자 이외 관련 담당부서 등 당사 내부에 관계하여 접근 및 열람이 가능한 정보를 가지고 있는 자산"
  },
  {
    level: "하",
    group: "자산 소유 담당부서/담당자 이외 관련 담당부서 등 당사 내부에 관계하여 접근 및 열람이 가능한 정보를 가지고 있는 자산",
    description: "자산 소유 담당부서/담당자 이외 관련 담당부서 등 당사 내부에 관계하여 접근 및 열람이 가능한 정보를 가지고 있는 자산"
  }
];


</script>

<style scoped></style>