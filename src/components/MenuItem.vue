<template>
  <template v-for="item in items" :key="item.menuId">
    <el-sub-menu v-if="item.children.length" :index="item.menuId">
      <template #title>
        {{ item.menuName }}
      </template>
      <menu-item :items="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="item.menuId">
      {{ item.menuName }}
    </el-menu-item>
  </template>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
});
</script>
