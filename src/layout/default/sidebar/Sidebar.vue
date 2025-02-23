<template>
  <el-aside>
    <el-scrollbar>
      <h3 class="sidebar-title">{{ selectedMenu.menuName }}</h3>
      <el-menu>
        <template v-for="menu in selectedMenu.children" :key="menu.menuId">
          <el-sub-menu v-if="menu.children && menu.children.length" :index="menu.menuId" class="main-menu-title">
            <template #title>
              {{ menu.menuName }}
            </template>
            <menu-item :items="menu.children" />
          </el-sub-menu>
          <el-menu-item v-else :index="menu.menuId" class="main-menu-title">
            {{ menu.menuName }}
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup>
  import { defineProps, ref } from 'vue';
  import MenuItem from '@/components/MenuItem.vue';

  const props = defineProps({
    selectedMenu: Object
  });

</script>

<style>
  .el-menu-item.main-menu-title,
  .el-sub-menu.main-menu-title>.el-sub-menu__title{
    color: #000;
    font-weight: 900;
  }
  .el-aside{
    /* width: 220px !important; */
    height: calc(100vh - 72px);
    border-right: 1px solid var(--el-menu-border-color);
  }

  .el-menu{
    border-right: none !important;
  }
  .sidebar-title{
    padding: 30px 20px;
  }
</style>