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

<style scoped></style>
