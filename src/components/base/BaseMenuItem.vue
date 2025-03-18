<template>
  <div>
    <div v-for="item in items" :key="item.menuId">
      <!-- 부모 메뉴 (자식이 있을 경우) -->
      <el-sub-menu v-if="item.children.length" :index="item.menuId">
        <template #title>
          <span @click.stop="handleClick(item.menuId)">{{ item.menuName }}</span>
        </template>
        <menu-item :items="item.children" @select="handleClick" />
      </el-sub-menu>

      <!-- 개별 페이지로 이동하는 단일 메뉴 (자식이 없는 경우) -->
      <el-menu-item v-else :index="item.menuId" @click="handleClick(item.menuId)">
        {{ item.menuName }}
      </el-menu-item>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
});
const emit = defineEmits(["select"]);

const handleClick = (menuId) => {
  console.log("클릭된 menuId:", menuId); // 디버깅용 로그
  emit("select", menuId); // 부모로 이벤트 전달
};
</script>
