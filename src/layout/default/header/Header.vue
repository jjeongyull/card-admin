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
        <Menu />
      </el-icon>

      <!-- 데스크톱에서는 네비게이션 메뉴 -->
      <nav class="menu">
        <el-button
          v-for="(menu, index) in menuList"
          :key="menu.menuId"
          class="header-text"
          text
          @click="selectMenu(menu, index)"
        >
          {{ menu.menuName }}
        </el-button>
      </nav>
    </div>

    <!-- 툴바 -->
    <div class="toolbar">
      <el-dropdown>
        <div class="icon-wrapper">
          <el-icon><UserFilled /></el-icon>
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
  import { ref, defineEmits } from 'vue';
  import { useRouter } from "vue-router";
  import menuData from '@/data/menu.json';
  import configData from '@/data/config.json';

  const config = ref(configData)
  const router = useRouter();
  const emit = defineEmits(['menu-selected']);
  const menuList = ref(menuData);
  const drawerVisible = ref(false);

  const menuPath = ref([
    { path: "/dashboard" },
    { path: "/policy" },
    { path: "/policy" },
    { path: "/policy" },
    { path: "/policy" },
    { path: "/policy" },
    { path: "/policy" },
    { path: "/policy" },
    { path: "/policy" },
    { path: "/policy" },
    { path: "/policy" },
  ]);

  const selectMenu = (menu, index) => {
    emit('menu-selected', menu.children.length > 0 ? menu : null);
    if (menuPath.value[index]) {
      router.push(menuPath.value[index].path);
    }
  };
</script>

<style scoped>
/* 헤더 스타일 */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 72px;
  background-color: #fff;
  border-bottom: 1px solid #E4E7ED;
}

/* 왼쪽 섹션 (로고 & 메뉴) */
.left-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* 로고 */
.logo {
  height: 25px;
}

/* 네비게이션 메뉴 (데스크톱) */
.menu {
  display: flex;
  gap: 7px;
}

/* 햄버거 메뉴 (모바일) */
.menu-icon {
  display: none;
  font-size: 24px;
  cursor: pointer;
}

/* 버튼 스타일 */
.el-button.header-text span {
  font-weight: 900;
  color: #000;
}

/* 툴바 */
.toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 아이콘 */
.icon-wrapper {
  width: 37px;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #ddd;
}

.user-role {
  font-size: 12px;
  color: #333;
}

/* 📌 반응형 스타일 */
@media (max-width: 768px) {
  /* 모바일에서는 네비게이션 숨기고 햄버거 아이콘 표시 */
  .menu {
    display: none;
  }

  .menu-icon {
    display: block;
  }
}
</style>

<style>
.el-button>span{
  font-weight: 900;
  color: #000;
}
</style>
