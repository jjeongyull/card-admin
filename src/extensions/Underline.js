import { Mark } from '@tiptap/core'

export const Underline = Mark.create({
  name: 'underline',

  parseHTML() {
    return [{ tag: 'u' }, { style: 'text-decoration', getAttrs: value => value === 'underline' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['u', HTMLAttributes, 0]
  },

  addCommands() {
    return {
      toggleUnderline: () => ({ commands }) => {
        return commands.toggleMark(this.name)
      },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-u': () => this.editor.commands.toggleUnderline(),
    }
  },
})
