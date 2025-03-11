<template>
  <el-collapse
    v-model="isOpen"
    accordion
    class="custom-collapse"
    :class="{ 'collapsed-style': !isExpanded }"
    :style="{ minHeight: isExpanded ? '100%' : '50px' }"
  >
    <el-collapse-item :title="title" name="1" class="dash-title">
      <slot></slot>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";

const props = defineProps({
  title: String,
  defaultState: Boolean,
});

// `ref([])` 배열을 사용하여 `el-collapse`가 올바르게 인식하도록 설정
const isOpen = ref(props.defaultState ? ["1"] : []);

// `isExpanded`가 `defaultState`에 따라 변경되도록 `computed` 수정
const isExpanded = computed(() => isOpen.value.includes("1"));

// `defaultState`가 변경될 경우 `watchEffect`를 사용해 반영
watchEffect(() => {
  isOpen.value = props.defaultState ? ["1"] : [];
});
</script>

<style scoped>
.custom-collapse {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  height: 100%;
  background-color: #fff;
}
.collapsed-style {
  box-shadow: none;
  overflow: hidden;
  background-color: transparent;
}
</style>
