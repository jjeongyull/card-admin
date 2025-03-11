<template>
  <div class="calendar-wrapper">
    <div class="calendar-header">
      <el-button @click="prevMonth" icon="ArrowLeft" circle />
      <h3>{{ currentMonth }} {{ currentYear }}</h3>
      <el-button @click="nextMonth" icon="ArrowRight" circle />
    </div>

    <el-calendar v-model="selectedDate" class="custom-calendar">
      <template #date-cell="{ data }">
        <div
          :class="['calendar-day', { today: isToday(data.day) }]"
          @click="openDataPopup(data.day)"
        >
          {{ formatDay(data.day) }}
          <span v-if="hasData(data.day)" class="data-dot"></span>
        </div>
      </template>
    </el-calendar>

    <!-- 팝업 컴포넌트 -->
    <CalendarPopup
      :visible="dataPopupVisible"
      :data="filteredData"
      @close="dataPopupVisible = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import CalendarPopup from "./CalendarPopup.vue";

const selectedDate = ref(new Date());
const dataPopupVisible = ref(false);
const filteredData = ref([]);

// 현재 연도와 월 계산
const currentYear = computed(() => selectedDate.value.getFullYear());
const currentMonth = computed(() =>
  selectedDate.value.toLocaleString("default", { month: "long" })
);

// 날짜 표시 형식 조정
const formatDay = (day) => {
  return day.length > 8 ? day.substr(8, 2) : day;
};

// 오늘 날짜 확인 함수
const isToday = (timestamp) => {
  if (!timestamp || isNaN(new Date(timestamp).getTime())) return false;
  const today = new Date();
  const date = new Date(timestamp);
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

// 더미 데이터 리스트
const dummyData = ref([
  { date: "2025-06-10", name: "테스트 데이터 A" },
  { date: "2025-06-15", name: "테스트 데이터 B" },
  { date: "2025-06-25", name: "테스트 데이터 C" },
]);

// 해당 날짜에 데이터가 있는지 확인
const hasData = (timestamp) => {
  if (!timestamp || isNaN(new Date(timestamp).getTime())) return false;
  const dateStr = new Date(timestamp).toISOString().split("T")[0];
  return dummyData.value.some((item) => item.date === dateStr);
};

// 특정 날짜 클릭 시 해당 데이터 필터링 후 팝업 표시
const openDataPopup = (timestamp) => {
  console.log(timestamp)
  if (!timestamp || isNaN(new Date(timestamp).getTime())) return;
  const dateStr = new Date(timestamp).toISOString().split("T")[0];
  filteredData.value = dummyData.value.filter((item) => item.date === dateStr);
  dataPopupVisible.value = true;
};

// 이전/다음 달 이동 기능
const prevMonth = () => {
  selectedDate.value.setMonth(selectedDate.value.getMonth() - 1);
  selectedDate.value = new Date(selectedDate.value);
};

const nextMonth = () => {
  selectedDate.value.setMonth(selectedDate.value.getMonth() + 1);
  selectedDate.value = new Date(selectedDate.value);
};
</script>

<style src="@/assets/styles/components/CalendarComponent.css"></style>
