<template>
  <el-main class="default-layout-content">
    <router-view v-slot="{ Component }">
      <el-scrollbar>
        <keep-alive>
          <transition name="slide" mode="out-in">
            <component :is="Component" class="default-layout-content-container"/>
          </transition>
        </keep-alive>
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
