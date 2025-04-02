<template>
  <div class="rich-editor">
    <!-- 메뉴 탭 -->
    <div class="menu-bar">
      <div class="menu-item" v-for="menu in menuItems" :key="menu.label">
        <span @click="menu.action">{{ menu.label }}</span>
      </div>
    </div>

    <!-- 툴바 -->
    <div class="toolbar" v-if="editor">
      <button @click="editor.chain().focus().undo().run()" title="되돌리기"><Undo /></button>
      <button @click="editor.chain().focus().redo().run()" title="다시 실행"><Redo /></button>
      <button @click="editor.chain().focus().toggleBold().run()" :class="{ active: editor.isActive('bold') }" title="굵게"><Bold /></button>
      <button @click="editor.chain().focus().toggleItalic().run()" :class="{ active: editor.isActive('italic') }" title="기울임"><Italic /></button>
      <button @click="editor.chain().focus().toggleUnderline().run()" :class="{ active: editor.isActive('underline') }" title="밑줄"><UnderlineIcon /></button>
      <input type="color" @input="setColor" title="글자 색상" />
      <button @click="editor.chain().focus().setTextAlign('left').run()" title="좌측 정렬"><AlignLeft /></button>
      <button @click="editor.chain().focus().setTextAlign('center').run()" title="가운데 정렬"><AlignCenter /></button>
      <button @click="editor.chain().focus().setTextAlign('right').run()" title="우측 정렬"><AlignRight /></button>
      <button @click="setLink" title="링크 추가"><LinkIcon /></button>
      <input type="file" @change="handleImageUpload" title="이미지 업로드" />
      <button @click="insertTable" title="테이블 삽입">📊</button>
    </div>

    <!-- 에디터 -->
    <EditorContent v-if="editor" :editor="editor" class="editor-content" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import { Underline } from '@/extensions/Underline'

import { Bold, Italic, Undo, Redo, UnderlineIcon, AlignLeft, AlignCenter, AlignRight, Link as LinkIcon, Image as ImageIcon } from 'lucide-vue-next'

const props = defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])

const editor = ref(null)

onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue || '',
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Underline
    ],
    onUpdate({ editor }) {
      emit('update:modelValue', editor.getHTML())
    },
  })
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

const setColor = (e) => {
  editor.value.chain().focus().setColor(e.target.value).run()
}

const setLink = () => {
  const url = prompt('링크 주소를 입력하세요:')
  if (url) {
    editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    const base64 = reader.result
    editor.value.chain().focus().setImage({ src: base64 }).run()
  }
  reader.readAsDataURL(file)
}

const insertTable = () => {
  editor.value.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
}

const menuItems = [
  { label: '파일', action: () => alert('파일 기능은 추후 구현 예정입니다.') },
  { label: '수정', action: () => editor.value?.chain().focus().undo().run() },
  { label: '보기', action: () => alert('전체 화면/미리보기 등 포함 예정') },
  { label: '포맷', action: () => alert('헤딩, 리스트, 인용구 등') },
  { label: '테이블', action: insertTable },
]
</script>

<style scoped>
.rich-editor {
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: 'Segoe UI', sans-serif;
  background: #fff;
}

.menu-bar {
  display: flex;
  gap: 24px;
  padding: 10px 16px;
  background: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.menu-item span {
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: #fafafa;
  border-bottom: 1px solid #eee;
}

.toolbar button {
  border: 1px solid #ddd;
  background: white;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toolbar button.active {
  background: #42b983;
  color: white;
  border-color: #42b983;
}

.toolbar input[type="color"] {
  border: none;
  background: none;
  cursor: pointer;
}

.editor-content {
  padding: 16px;
  min-height: 300px;
  font-size: 16px;
  line-height: 1.6;
}
:deep(.ProseMirror img){
  width: 100% !important;
}
</style>
