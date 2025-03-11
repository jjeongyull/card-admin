<template>
  <el-menu
    :default-active="selectedMenu.menuId"
    :collapse="isCollapsed"
    class="menu-container"
    v-if="!isCollapsed"
  >
    <div v-for="menu in selectedMenu.children" :key="menu.menuId">
      <!-- 하위 메뉴가 있는 경우 -->
      <el-sub-menu v-if="menu.children && menu.children.length" :index="menu.menuId">
        <template #title>
          <span @click="sideClick(menu)">{{ menu.menuName }}</span>
        </template>
        <el-menu-item v-for="sub in menu.children" :key="sub.menuId" :index="sub.menuId" @click="sideClick(sub)">
          <span>{{ sub.menuName }}</span>
        </el-menu-item>
      </el-sub-menu>

      <!-- 하위 메뉴가 없는 경우 -->
      <el-menu-item v-else :index="menu.menuId" @click="sideClick(menu)">
        <span>{{ menu.menuName }}</span>
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  selectedMenu: Object,
  isCollapsed: Boolean,
});

const emit = defineEmits(["menu-click"]);

const sideClick = (menu) => {
  emit("menu-click", menu);
};
</script>

<style scoped>
.menu-container {
  width: 100%;
}
</style>
