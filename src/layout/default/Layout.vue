<template>
  <div class="common-layout">
    <el-container>
      <default-header @menu-selected="menuSelection" />
      <el-container>
        <default-sidebar v-if="selectedMenu" :selectedMenu="selectedMenu" />
        <default-content />
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Sidebar, Content, Header } from '.';

const selectedMenu = ref(null);

export default {
  name: 'default-layout',
  components: {
    'default-header': Header,
    'default-sidebar': Sidebar,
    'default-content': Content
  },
  setup() {
    const selectedMenu = ref(null);

    const menuSelection = (menu) => {
      selectedMenu.value = menu;
    };

    return {
      selectedMenu,
      menuSelection
    };
  }
}
</script>

<style scoped>
.common-layout > .el-container {
  flex-direction: column;
}
</style>
