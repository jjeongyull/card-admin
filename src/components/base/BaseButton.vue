<template>
  <el-button
    v-bind="attrs"
    :type="type"
    :size="size"
    :class="customClass"
    :style="customStyle"
    @click="onClick"
  >
    <slot></slot>
  </el-button>
</template>

<script setup>
import { useAttrs } from "vue";

const props = defineProps({
  type: { type: String, default: "" },
  size: { type: String, default: "default" },
  customClass: { type: [String, Array, Object], default: "" }, // 사용자 정의 클래스
  customStyle: { type: Object, default: () => ({}) }, // 사용자 정의 스타일
});

const emit = defineEmits(["click"]);

const attrs = useAttrs(); // 추가적인 속성들을 자동 바인딩

const onClick = () => {
  emit("click");
};
</script>

<style scoped>
:deep(.el-button:hover) {
    background-color: var(--el-button-hover-bg-color);
    border-color: #000 !important;
    color: #000 !important;
    outline: none !important;
}
.white-button {
  background-color: #fff !important;
  color: #000 !important;
  border: 1px solid #000 !important;
  margin-left: 0;
}
.black-button {
  background-color: #000 !important;
  color: #fff !important;
  border: none !important;
}
.black-button .el-icon {
  color: #fff !important;
}
</style>
