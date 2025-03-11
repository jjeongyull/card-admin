<template>
  <el-aside
    :style="{
      width: isCollapsed ? '24px' : sidebarWidth + 'px',
      transition: enableTransition ? 'width 0.3s ease' : 'none'
      }"
    class="sidebar"
  >
    <el-scrollbar class="sidebar-scroll">
      <SidebarToggle :isCollapsed="isCollapsed" @toggle="toggleCollapse" />
      <SidebarMenu :selectedMenu="selectedMenu" :isCollapsed="isCollapsed" @menu-click="sideClick" />
    </el-scrollbar>

    <!-- 사이즈 조절 핸들 -->
    <div class="resizer" @mousedown="startResize"></div>
  </el-aside>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import SidebarMenu from "@/components/SidebarMenu.vue";
import SidebarToggle from "@/components/SidebarToggle.vue";


const emit = defineEmits(["sidebar-menu-click"]);
const props = defineProps({
  selectedMenu: Object,
});

const isCollapsed = ref(false);
const sidebarWidth = ref(220);
const enableTransition = ref(true);

const toggleCollapse = () => {
  enableTransition.value = true;
  isCollapsed.value = !isCollapsed.value;
  sidebarWidth.value = isCollapsed.value ? 64 : 220;
};

const sideClick = (menu) => {
  emit("sidebar-menu-click", menu);
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

<style src="@/assets/styles/layout/sidebar.css"></style>
