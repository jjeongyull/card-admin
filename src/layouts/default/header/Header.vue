<template>
  <el-header class="header">
    <!-- 로고 & 메뉴 버튼 -->
    <div class="left-section">
      <img
      :src="config.logo"
      alt="Logo"
      class="logo" />

      <!-- 모바일에서는 햄버거 메뉴 -->
      <el-icon class="menu-icon" @click="drawerVisible = true">
        <el-icon><Menu /></el-icon>
      </el-icon>

      <!-- 데스크톱에서는 네비게이션 메뉴 -->
      <nav class="menu">
        <BaseButton
          v-for="menu in menuList"
          :key="menu.menuId"
          class="header-text"
          link
          @click="selectMenu(menu)"
        >
          {{ menu.menuName }}
        </BaseButton>
      </nav>
    </div>

    <!-- 툴바 -->
    <div class="toolbar">
      <el-dropdown>
        <div class="icon-wrapper">
          <el-icon><el-icon><UserFilled /></el-icon></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>내 정보</el-dropdown-item>
            <el-dropdown-item>로그아웃</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span class="user-role">정보 보안팀 <span style="font-weight: 700;">총괄 관리자</span></span>
    </div>

    <!-- 모바일용 사이드 메뉴 -->
    <el-drawer v-model="drawerVisible" title="메뉴" direction="ltr">
      <el-menu>
        <el-menu-item
          v-for="(menu, index) in menuList"
          :key="menu.menuId"
          @click="selectMenu(menu, index); drawerVisible = false"
        >
          {{ menu.menuName }}
        </el-menu-item>
      </el-menu>
    </el-drawer>
  </el-header>
</template>

<script setup>
  import configData from '@/data/config.json';
  import { ref, computed } from 'vue';
  import { useMenuStore } from '@/store/menuStore';

  const config = ref(configData)
  const emit = defineEmits(['menu-selected']);
  const menuStore = useMenuStore();
  const menuList = computed(() => menuStore.menuList);
  const drawerVisible = ref(false);

  const selectMenu = (menu) => {
    emit("menu-selected", menu);
  };
</script>

<style scoped lang="scss" src="@/assets/styles/layout/header.scss"></style>
