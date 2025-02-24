<template>
  <el-main class="default-layout-content">
    <router-view v-slot="{ Component }">
      <el-scrollbar class="main-content-view">
          <transition name="slide">
            <keep-alive>
              <component :is="Component" class="default-layout-content-container"/>
            </keep-alive>
          </transition>
      </el-scrollbar>
    </router-view>
  </el-main>
</template>

<script>
export default {
  name: 'default-content'
}
</script>    

<style scoped>
  .default-layout-content{
    background-color: #e6e6e6;
    height: calc(100vh - 70px);
  }


</style>
<style>
  .main-content-view .el-scrollbar__view{
    height: 100%;
  }
</style>
