<template>
  <PolicyCompliance
    v-if="!selectCompliance"
    :complianceList="complianceList"
    @selectedCom="selectedCom"
    />
  <PolicyComplianceInfo
    v-else-if="selectCompliance"
    :complianceList="complianceList"
    :selectComplianceCategory="selectCompliance"
    @selectedCom="selectedCom"
    />
</template>

<script setup>
import { ref } from "vue";
import PolicyCompliance from '@/pages/policy/PolicyCompliance.vue';
import PolicyComplianceInfo from '@/pages/policy/PolicyComplianceInfo.vue';


const selectCompliance = ref(null);
const complianceList = ref([
  { id: 0, title: "상시평가", date: "4.23년", status: "yellow", category: "정보보안" },
  { id: 1, title: "보안성심의 컴플라이언스", date: "4.23년", status: "green", category: "정보보안" },
  { id: 2, title: "전자금융기반시설", date: "4.23년", status: "yellow", category: "ESG" },
  { id: 3, title: "ISMS-P", date: "4.23년", status: "yellow", category: "정보보안" },
  { id: 4, title: "개인정보보호테마점검", date: "4.23년", status: "yellow", category: "정보보안" },
  { id: 5, title: "모의해킹", date: "4.23년", status: "green", category: "정보보안" },
  { id: 6, title: "ISO27001", date: "4.23년", status: "yellow", category: "ESG" },
  { id: 7, title: "PCI-DSS", date: "4.23년", status: "red", category: "정보보안" },
  { id: 8, title: "K-ESG가이드라인", date: "4.23년", status: "green", category: "ESG" },
  { id: 9, title: "정보보호의날(본사)", date: "4.23년", status: "green", category: "ESG" },
  { id: 10, title: "주요정보통신기반시설", date: "4.23년", status: "green", category: "정보보안" },
  { id: 11, title: "bnk내규", date: "4.23년", status: "green", category: "정보보안" },
  { id: 12, title: "신규 ISMS", date: "4.23년", status: "red", category: "정보보안" },
]);

const selectedCom = (id) => {
  selectCompliance.value = complianceList.value.find((items) => {
    return Number(items.id) === Number(id)
  });
}
</script>
