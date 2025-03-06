<template>
  <el-scrollbar class="main-content-view">
    <el-main class="default-layout-content">
      <router-view v-slot="{ Component }">
        <transition name="slide">
          <keep-alive>
            <component :is="Component" class="default-layout-content-container"/>
          </keep-alive>
        </transition>
      </router-view>
    </el-main>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'default-content'
}
</script>    

<style scoped>
  .default-layout-content{
    background-color: #e6e6e6;
    min-height: calc(100vh - 72px);
    height: 100%;
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 30px;
  }
</style>

