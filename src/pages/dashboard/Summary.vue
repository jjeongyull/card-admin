<template>
  <div>
    <div class="test-btn-group">
      <BaseButton :class="viewMode === 0 && 'is-active'" @click="viewMode = 0">현업자 대시보드</BaseButton>
      <BaseButton :class="viewMode === 1 && 'is-active'" @click="viewMode = 1">점검자 대시보드</BaseButton>
      <BaseButton :class="viewMode === 2 && 'is-active'" @click="viewMode = 2">C-level 대시보드</BaseButton>
    </div>

    <WorkerDashboard v-if="viewMode === 0"/>
    <InspectorDashboard v-else-if="viewMode === 1"/>
    <ClevelDashboard v-else-if="viewMode === 2"/>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  // 현업자대시보드
  import WorkerDashboard from './WorkerDashboard.vue';
  // 점검자대시보드
  import InspectorDashboard from './InspectorDashboard.vue';
  // C레벨 대시보드
  import ClevelDashboard from './ClevelDashboard.vue';

  const viewMode = ref(0);

</script>

<style scoped>
  .test-btn-group{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
</style>
