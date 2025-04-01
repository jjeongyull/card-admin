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
  type: { type: String, default: "info" },
  size: { type: String, default: "default" },
  customClass: { type: [String, Array, Object], default: "" }, // 사용자 정의 클래스
  customStyle: { type: Object, default: () => ({}) }, // 사용자 정의 스타일
});

const emit = defineEmits(["click"]);

const attrs = useAttrs(); // 추가적인 속성들을 자동 바인딩

const onClick = (e) => {
  try {
    e.stopPropagation();
    emit("click");
    // 실행할 코드
  } catch (error) {
    console.error("버튼 클릭 중 오류 발생:", error);
  }
};
</script>

<style scoped>
:deep(.el-button:hover) {
    background-color: var(--el-button-hover-bg-color);
    border-color: #000 !important;
    color: #000 !important;
    outline: none !important;
}
.el-button.is-disabled {
  opacity: .5;
}
.white-button {
  background-color: #fff !important;
  color: #000 !important;
  border: 1px solid #000 !important;
  margin-left: 0;
}
.info-button{
  background-color: #fff !important;
  color: #616161 !important;
  border: 1px solid #DCDFE6 !important;
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
