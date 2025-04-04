<template>
  <el-row :gutter="10" class="mb-20">
    <el-col :xs="24" :sm="24" :md="8" style="display: flex; flex-direction: column;">
      <BaseCard title="WEB">
        <el-row class="card-content">
          <div class="flex-space w-full">
            <p>4/12</p>
            <p>33.3%</p>
          </div>
        </el-row>
      </BaseCard>
    </el-col>
    <el-col :xs="24" :sm="24" :md="8" style="display: flex; flex-direction: column;">
      <BaseCard title="APP">
        <el-row class="card-content">
          <div class="flex-space w-full">
            <p>2/10</p>
            <p>20%</p>
          </div>
        </el-row>
      </BaseCard>
    </el-col>
    <el-col :xs="24" :sm="24" :md="8" style="display: flex; flex-direction: column;">
      <BaseCard title="전체">
        <el-row class="card-content">
          <div class="flex-space w-full">
            <p>6/22</p>
            <p>27.2%</p>
          </div>
        </el-row>
      </BaseCard>
    </el-col>
  </el-row>
</template>

<script setup>
</script>