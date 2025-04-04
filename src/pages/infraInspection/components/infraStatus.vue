<template>
  <el-row :gutter="10" class="mb-20">
    <el-col :xs="24" :sm="8" :md="4" style="display: flex; flex-direction: column;">
      <BaseCard title="서버 (OS)">
        <el-row class="card-content">
          <div class="flex-space w-full">
            <p>4/12</p>
            <p>33.3%</p>
          </div>
        </el-row>
      </BaseCard>
    </el-col>
    <el-col :xs="24" :sm="8" :md="4" style="display: flex; flex-direction: column;">
      <BaseCard title="데이터베이스">
        <el-row class="card-content">
          <div class="flex-space w-full">
            <p>2/10</p>
            <p>20%</p>
          </div>
        </el-row>
      </BaseCard>
    </el-col>
    <el-col :xs="24" :sm="8" :md="4" style="display: flex; flex-direction: column;">
      <BaseCard title="네트워크">
        <el-row class="card-content">
          <div class="flex-space w-full">
            <p>6/22</p>
            <p>27.2%</p>
          </div>
        </el-row>
      </BaseCard>
    </el-col>
    <el-col :xs="24" :sm="8" :md="4" style="display: flex; flex-direction: column;">
      <BaseCard title="보안장비">
        <el-row class="card-content">
          <div class="flex-space w-full">
            <p>6/22</p>
            <p>27.2%</p>
          </div>
        </el-row>
      </BaseCard>
    </el-col>
    <el-col :xs="24" :sm="8" :md="4" style="display: flex; flex-direction: column;">
      <BaseCard title="WEB/WAS">
        <el-row class="card-content">
          <div class="flex-space w-full">
            <p>6/22</p>
            <p>27.2%</p>
          </div>
        </el-row>
      </BaseCard>
    </el-col>
    <el-col :xs="24" :sm="8" :md="4" style="display: flex; flex-direction: column;">
      <BaseCard title="총 자산수">
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