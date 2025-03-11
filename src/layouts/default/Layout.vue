<template>
  <div class="common-layout">
    <el-container>
      <default-header @menu-selected="menuSelection"/>
      <el-container class="main-container">
        <default-sidebar
          v-if="subMenu.length > 0"
          :selectedMenu="selectedMenu"
          @sidebar-menu-click="sidebarClick"
        />
        <default-content class="content"  :class="{ 'full-width': subMenu.length === 0 }"/>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { onMounted, ref, computed, watchEffect } from "vue";
import { Content, Header, Sidebar } from ".";
import { useMenuStore } from "@/store/menuStore";
import { uRouter } from '@/utils'

import { useResponsive } from "@/composables/useResponsive";

export default {
  name: "default-layout",
  components: {
      "default-header": Header,
      "default-sidebar": Sidebar,
      "default-content": Content,
  },
  setup() {
    const { isMobile, isSidebarOpen } = useResponsive();
    const menuStore = useMenuStore();

    const selectedMenu = computed(() => menuStore.selectedMenu);
    const subMenu = computed(() => menuStore.subMenu);

    const sidebarWidth = ref(220);


    // 헤더에서 메뉴 선택 시 `selectedMenu` 변경
    const menuSelection = (menu) => {
      menuStore.selectMenu(menu);
      uRouter.goToByMenuId(menu.menuId);
    };

    // 사이드바에서 메뉴 클릭 시 (페이지 이동만)
    const sidebarClick = (menu) => {
      try {
        uRouter.goToByMenuId(menu.menuId);
      } catch (error) {
        console.log(error);
      }
    };

    const handleBack = () => {
        const pathSegments = window.location.pathname.split("/").filter(Boolean); // 빈 값 제거
        const lastPath = pathSegments.length ? pathSegments[pathSegments.length - 1] : "/"; // 마지막 path 값 가져오기
        const menu = uRouter.findMenuByPath(lastPath);
        menuStore.selectMenu(menu.menu);
        uRouter.goToByMenuId(menu.menu.menuId);
    };


    watchEffect(() => {
        menuStore.handlePopState();
    });

    onMounted(() => {
        menuStore.setSelectedMenuByRoute();
        window.addEventListener("popstate", handleBack);
    });

    return {
        selectedMenu,
        sidebarClick,
        menuSelection,
        subMenu,
        sidebarWidth,
        isMobile,
        isSidebarOpen,
    };
},
};
</script>

<style scoped src="@/assets/styles/layout/layout.css"></style>
