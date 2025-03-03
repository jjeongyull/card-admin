<template>
  <el-aside
    :style="{
      width: isCollapsed ? '24px' : sidebarWidth + 'px',
      transition: enableTransition ? 'width 0.3s ease' : 'none'
    }"
    class="sidebar"
    ref="sidebarRef"
  >
    <el-scrollbar class="sidebar-scroll">
      <!-- 접기/펼치기 버튼 -->
      <div class="sidebar-header">
        <el-button @click="toggleCollapse" class="toggle-btn" circle type="link">
          <el-icon v-if="!isCollapsed"><ArrowLeft /></el-icon>
          <el-icon v-else><ArrowRight /></el-icon>
        </el-button>
      </div>

      <el-menu
        :default-active="selectedMenu.menuId"
        :collapse="isCollapsed"
        class="menu-container"
        v-if="!isCollapsed"
      >
        <div v-for="menu in selectedMenu.children" :key="menu.menuId">
          <el-sub-menu v-if="menu.children && menu.children.length" :index="menu.menuId">
            <template #title>
              <span>{{ menu.menuName }}</span>
            </template>
            <menu-item :items="menu.children" />
          </el-sub-menu>
          <el-menu-item v-else :index="menu.menuId">
            <span>{{ menu.menuName }}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-scrollbar>

    <!-- 사이즈 조절 핸들 -->
    <div class="resizer" @mousedown="startResize"></div>
  </el-aside>
</template>

<script setup>
import MenuItem from '@/components/MenuItem.vue';
import { ref } from 'vue';

const props = defineProps({
  selectedMenu: Object
});

const isCollapsed = ref(false);
const sidebarWidth = ref(220);
const sidebarRef = ref(null);
const enableTransition = ref(true); // 애니메이션 활성화 여부

const toggleCollapse = () => {
  enableTransition.value = true;
  isCollapsed.value = !isCollapsed.value;
  sidebarWidth.value = isCollapsed.value ? 64 : 220;
};

const startResize = (event) => {
  enableTransition.value = false; // 드래그 시 애니메이션 비활성화

  const startX = event.clientX;
  const startWidth = sidebarWidth.value;

  const onMouseMove = (e) => {
    const deltaX = e.clientX - startX;
    let newWidth = startWidth + deltaX;

    const maxWidth = window.innerWidth * 0.5;

    if (newWidth <= 64) {
      newWidth = 64;
      isCollapsed.value = true;
    } else if (newWidth >= maxWidth) {
      newWidth = maxWidth;
    } else {
      isCollapsed.value = false;
    }

    sidebarWidth.value = newWidth;
  };

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};
</script>

<style scoped>
.sidebar {
  border-right: 1px solid var(--el-menu-border-color);
  position: relative;
}
.toggle-btn{
  position: absolute;
  right: -16px;
  z-index: 999;
}

.sidebar-header {
  display: flex;
  justify-content: center;
  padding: 10px;
  position: relative;
}
.menu-container {
  border-right: none;
  overflow: hidden;
}

.resizer {
  width: 2px;
  height: 100%;
  background: #ccc;
  position: absolute;
  right: 0;
  top: 0;
  cursor: ew-resize;
}
</style>


<style>
.sidebar {
  border-right: 1px solid var(--el-menu-border-color);
  position: relative;
}
.toggle-btn{
  position: absolute;
  right: -16px;
  z-index: 999;
}


.sidebar-header {
  display: flex;
  justify-content: center;
  padding: 10px;
  position: relative;
}
.menu-container {
  border-right: none;
  overflow: hidden;
}

.resizer {
  width: 2px;
  height: 100%;
  background: #ccc;
  position: absolute;
  right: 0;
  top: 0;
  cursor: ew-resize;
}
.el-aside.sidebar{
  overflow: visible !important;
}
.sidebar-scroll.el-scrollbar{
  overflow: visible !important;
}
.sidebar-scroll.el-scrollbar .el-aside.sidebar{
  overflow: visible !important;
}
.sidebar-scroll.el-scrollbar .el-scrollbar__wrap--hidden-default{
  overflow: visible !important;
}

</style>
