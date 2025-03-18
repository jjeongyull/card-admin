<template>
  <div class="common-layout">
    <el-container>
      <default-header @menu-selected="menuSelection"/>
      <el-container class="main-container">
        <default-content class="content"/>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { onMounted, ref, computed, watchEffect } from "vue";
import { Content, Header } from ".";
import { useMenuStore } from "@/store/menuStore";
import { uRouter } from '@/utils'


export default {
  name: "default-layout",
  components: {
      "default-header": Header,
      "default-content": Content,
  },
  setup() {

    const menuStore = useMenuStore();

    const selectedMenu = computed(() => menuStore.selectedMenu);


    // 헤더에서 메뉴 선택 시 `selectedMenu` 변경
    const menuSelection = (menu) => {
      menuStore.selectMenu(menu);
      uRouter.goToByMenuId(menu.menuId);
    };


    const handleBack = () => {
        const pathSegments = window.location.pathname.split("/").filter(Boolean); // 빈 값 제거
        const lastPath = pathSegments.length ? pathSegments[pathSegments.length - 1] : "/"; // 마지막 path 값 가져오기
        const menu = uRouter.findMenuByPath(lastPath);
        if(menu){
          menuStore.selectMenu(menu.menu);
          uRouter.goToByMenuId(menu.menu.menuId);
        }
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
        menuSelection,
    };
},
};
</script>

<style scoped src="@/assets/styles/layout/layout.css"></style>
