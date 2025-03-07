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
import { onBeforeUnmount, onMounted, ref, computed, watchEffect } from "vue";
import { Content, Header, Sidebar } from ".";
import { useMenuStore } from "@/store/menuStore";
  import { uRouter } from '@/utils'

export default {
  name: "default-layout",
  components: {
      "default-header": Header,
      "default-sidebar": Sidebar,
      "default-content": Content,
  },
  setup() {
    const menuStore = useMenuStore();

    const selectedMenu = computed(() => menuStore.selectedMenu);
    const subMenu = computed(() => menuStore.subMenu);

    const sidebarWidth = ref(220);
    const isMobile = ref(window.innerWidth <= 768);
    const isSidebarOpen = ref(true);

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

    const handleResize = () => {
        isMobile.value = window.innerWidth <= 768;
        if (isMobile.value) {
            isSidebarOpen.value = false;
        }
    };

    watchEffect(() => {
        menuStore.handlePopState();
    });

    onMounted(() => {
        window.addEventListener("resize", handleResize);
        menuStore.setSelectedMenuByRoute();
        window.addEventListener("popstate", handleBack);
    });

    onBeforeUnmount(() => {
        window.removeEventListener("resize", handleResize);
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

<style scoped>
.common-layout > .el-container {
  flex-direction: column;
}

.main-container {
  display: flex;
  height: calc(100vh - 72px);
  position: relative;
}

.content {
  flex-grow: 1;
  width: 100%;
}
</style>
