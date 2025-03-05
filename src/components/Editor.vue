<template>
  <div>
    <quill-editor
      v-model="content"
      contentType="html"
      toolbar="full"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const props = defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])

const content = ref(props.modelValue || '')

// 입력 내용이 변경될 때 부모로 업데이트
watch(content, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<style scoped>
/* 에디터 크기 조정 */
.quill-editor {
  min-height: 200px;
}
</style>
