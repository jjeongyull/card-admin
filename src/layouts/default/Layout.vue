<template>
  <div class="common-layout">
      <el-container>
          <default-header @menu-selected="menuSelection" />
          <el-container class="main-container">
              <default-sidebar
                  v-if="selectedMenu !== null && selectedMenu.children && selectedMenu.children.length"
                  :selectedMenu="selectedMenu"
              />
              <default-content class="content"  :class="{ 'full-width': !selectedMenu }"/>
          </el-container>
      </el-container>
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted, ref } from "vue";
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
        if (menu === null) {
            selectedMenu.value = null;
        } else {
            selectedMenu.value = Object.assign({}, menu);
        }
      };

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
