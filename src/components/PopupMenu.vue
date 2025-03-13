<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <el-icon><more /></el-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in menuItems"
          :key="item.command"
          :command="item.command"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>


export default {
  name: 'PopupMenu',
  props: {
    menuItems: {
      type: Array,
      required: true,
      default: () => [] // 기본값은 빈 배열
    }
  },
  emits: ['command'],
  setup(props, { emit }) {
    const handleCommand = (command) => {
      emit('command', command)
    }

    return {
      handleCommand
    }
  }
}
</script>

<style scoped>
.el-dropdown {
  cursor: pointer;
}
</style>