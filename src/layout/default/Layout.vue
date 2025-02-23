<template>
  <div class="common-layout">
    <el-container>
      <default-header @menu-selected="menuSelection" />
      <el-container class="main-container">
        <!-- 햄버거 버튼 (작은 화면에서만 보임) -->
     

        <!-- 사이드바 (width 조절 가능, 모바일에서는 숨김) -->
        <default-sidebar
          v-if="selectedMenu && (!isMobile || isSidebarOpen)"
          :selectedMenu="selectedMenu"
          :style="{ width: sidebarWidth + 'px' }"
        />
      <button class="menu-toggle" @click="toggleSidebar" v-if="isMobile">
        ☰
      </button>

        <!-- 사이드바 리사이즈 핸들 (데스크탑에서만 보임) -->
        <div
          v-if="selectedMenu && !isMobile"
          class="resize-handle"
          @mousedown="startResize"
        ></div>

        <!-- 콘텐츠 영역 (남은 공간 자동 조절) -->
        <default-content class="content" />
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Sidebar, Content, Header } from '.';

export default {
  name: 'default-layout',
  components: {
    'default-header': Header,
    'default-sidebar': Sidebar,
    'default-content': Content
  },
  setup() {
    const selectedMenu = ref(null);
    const sidebarWidth = ref(300); // 기본 사이드바 너비
    const isSidebarOpen = ref(true); // 모바일에서 사이드바 상태
    let isResizing = false; // 드래그 중인지 여부

    const menuSelection = (menu) => {
      selectedMenu.value = menu;
    };

    // 반응형 감지
    const screenWidth = ref(window.innerWidth);
    const isMobile = computed(() => screenWidth.value < 768);

    const updateScreenWidth = () => {
      screenWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener('resize', updateScreenWidth);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateScreenWidth);
    });

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    // 드래그 시작
    const startResize = (event) => {
      isResizing = true;
      const startX = event.clientX;
      const startWidth = sidebarWidth.value;

      const doResize = (moveEvent) => {
        if (isResizing) {
          const newWidth = startWidth + (moveEvent.clientX - startX);
          sidebarWidth.value = Math.min(500, Math.max(200, newWidth)); // 최소 200px, 최대 500px
        }
      };

      const stopResize = () => {
        isResizing = false;
        document.removeEventListener('mousemove', doResize);
        document.removeEventListener('mouseup', stopResize);
      };

      document.addEventListener('mousemove', doResize);
      document.addEventListener('mouseup', stopResize);
    };

    return {
      selectedMenu,
      sidebarWidth,
      isSidebarOpen,
      menuSelection,
      startResize,
      toggleSidebar,
      isMobile
    };
  }
};
</script>

<style scoped>
/* 전체 레이아웃 */
.common-layout > .el-container {
  flex-direction: column;
}

/* 메인 컨테이너 */
.main-container {
  display: flex;
  height: calc(100vh - 72px); /* 헤더 제외한 높이 */
  position: relative;
}

/* 햄버거 버튼*/
.menu-toggle {
  display: none;
  position: absolute;
  top: 10px;
  left: 10px;
  background: #333;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 18px;
  z-index: 10;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }
}

/* 사이드바 */
.default-sidebar {
  transition: width 0.1s ease-in-out;
  overflow: hidden;
  background: #f5f5f5;
}

/* 리사이즈 핸들 */
.resize-handle {
  width: 3px;
  cursor: ew-resize;
  background: #f5f5f5;
  transition: background 0.2s;
}


.content {
  flex-grow: 1;
}
.el-aside{
  border-right: none;
}
</style>
