<template>
  <div class="common-layout">
      <el-container>
          <default-header @menu-selected="menuSelection" />
          <el-container class="main-container">
              <default-sidebar
                  v-if="selectedMenu && selectedMenu.children && selectedMenu.children.length"
                  :selectedMenu="selectedMenu"
                  @update:width="updateSidebarWidth"
              />
              <default-content 
                  class="content" 
                  :style="{ width: (selectedMenu && selectedMenu.children && selectedMenu.children.length) ? contentWidth : '100%' }" 
              />
          </el-container>
      </el-container>
  </div>
</template>

<script>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { Content, Header, Sidebar } from ".";

export default {
  name: "default-layout",
  components: {
      "default-header": Header,
      "default-sidebar": Sidebar,
      "default-content": Content,
  },
  setup() {
      const selectedMenu = ref(null);
      const sidebarWidth = ref(220);
      const isMobile = ref(window.innerWidth <= 768);
      const isSidebarOpen = ref(true);

      const menuSelection = (menu) => {
          if (!menu) {
              selectedMenu.value = null;
          } else {
              selectedMenu.value = Object.assign({}, menu);
          }
      };

      const updateSidebarWidth = (width) => {
          sidebarWidth.value = width > 64 ? width : 220;
      };

      const contentWidth = computed(() => {
          return isMobile.value ? "100%" : `calc(100% - ${sidebarWidth.value}px)`;
      });

      const handleResize = () => {
          isMobile.value = window.innerWidth <= 768;
          if (isMobile.value) {
              isSidebarOpen.value = false;
          }
      };

      onMounted(() => {
          window.addEventListener("resize", handleResize);
      });

      onBeforeUnmount(() => {
          window.removeEventListener("resize", handleResize);
      });

      return {
          selectedMenu,
          menuSelection,
          sidebarWidth,
          updateSidebarWidth,
          contentWidth,
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
  transition: width 0.3s ease;
}
</style>
