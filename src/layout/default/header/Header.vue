<template>
  <el-header class="header">
    <!-- 로고 -->
    <div class="logo">
      <img src="@/assets/card_logo.png" alt="Logo" />

      <!-- 네비게이션 메뉴 -->
      <nav class="menu">
        <el-button
          v-for="(menu, index) in menuList"
          :key="menu.menuId"
          class="heade-text"
          text
          @click="selectMenu(menu, index)"
        >
          {{ menu.menuName }}
        </el-button>
      </nav>
    </div>



    <!-- 툴바 (오른쪽 정렬) -->
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
  </el-header>
</template>


<script setup>
  import { ref, defineEmits } from 'vue';
  import menuData from '@/data/menu.json';
  import { useRouter } from "vue-router";

  const router = useRouter();
  const emit = defineEmits(['menu-selected']);
  const menuList = ref(menuData);
  const menuPath = ref([
    {path: "/dashboard"},
    {path: "/policy"},
    {path: "/policy"},
    {path: "/policy"},
    {path: "/policy"},
    {path: "/policy"},
    {path: "/policy"},
    {path: "/policy"},
    {path: "/policy"},
    {path: "/policy"},
    {path: "/policy"},
  ]);


  const selectMenu = (menu, index) => {
    emit('menu-selected', menu.children.length > 0 ? menu : null);
    if (menuPath.value[index]) {
      router.push(menuPath.value[index].path);
    }
  };


  
</script>

<style>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 72px; /* 높이 조절 */
  background-color: #fff;
  border-bottom: 1px solid #E4E7ED;
}

.logo{
  display: flex;
  align-items: center;
  gap: 70px;
}

/* 로고 스타일 */
.logo img {
  height: 25px; /* 로고 크기 조정 */
}

/* 메뉴 스타일 */
.menu {
  display: flex;
  gap: 15px;

}
.el-button.heade-text span{
  font-weight: 900;
  color: #000;
}

/* 툴바 스타일 */
.toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 아이콘을 원 안에 배치 */
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
</style>