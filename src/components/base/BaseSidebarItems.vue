<template>
  <el-menu
    v-if="!isCollapsed"
    :default-active="selectedMenu?.menuId"
    :collapse="isCollapsed"
    class="menu-container"
  >
    <!-- 대메뉴 표시 -->
    <el-sub-menu v-if="selectedMenu.children && selectedMenu.children.length" :index="selectedMenu.menuId">
      <template #title>
        <i :class="getMenuMetaInfo(selectedMenu.menuId)?.icon"></i>
        <span @click="sideClick(selectedMenu)">{{ selectedMenu.menuName }}</span>
      </template>

      <!-- 하위 메뉴(children) 반복 -->
      <el-menu-item
        v-for="sub in selectedMenu.children"
        :key="sub.menuId"
        :index="sub.menuId"
        @click="sideClick(sub)"
      >
        <span>{{ sub.menuName }}</span>
      </el-menu-item>
    </el-sub-menu>

    <!-- 하위 메뉴가 없는 단일 대메뉴 -->
    <el-menu-item v-else :index="selectedMenu.menuId" @click="sideClick(selectedMenu)">
      <span>{{ selectedMenu.menuName }}</span>
    </el-menu-item>
  </el-menu>
</template>


<script setup>
import { uRouter } from '@/utils'

const props = defineProps({
  selectedMenu: Object,
  isCollapsed: Boolean,
});

const emit = defineEmits(["menu-click"]);

const getMenuMetaInfo = (menuId) => {
  let routerInfo = [];
  try {
    routerInfo = uRouter.getRouterInfoByMenuId(menuId) || []; // routerInfo가 없을 경우 빈 배열 할당
  } catch (e) {
    console.error('물리적 router(index.js)와 논리적 DB 메뉴 정보가 다름! menuId:', menuId);
  }

  return {
    isNested: (routerInfo[0]?.meta?.isNested || false),
    icon: (routerInfo[0]?.meta?.icon || 'el-icon-menu')
  };
};

const sideClick = (menu) => {
  emit("menu-click", menu);
};
</script>

<style scoped lang="scss">
.menu-container {
  width: 100%;
}
.el-sub-menu__title i{
  font-size: 20px;
  margin-right: 5px;
}
:deep(.el-sub-menu__title),
:deep(.el-sub-menu .el-menu-item){
  line-height: 1.3 !important;
}
:deep(.el-sub-menu__title),
:deep(.el-sub-menu .el-menu-item)
{
  height: fit-content !important;
  padding-top: 15px;
  padding-bottom: 15px;
}
:deep(.el-sub-menu__title:hover),
:deep(.el-sub-menu .el-menu-item:hover){
  background: var(--color-brand-brand-secondary) !important;
}
</style>
