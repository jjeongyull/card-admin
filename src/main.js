import { ArrowLeft, ArrowRight, Delete, Edit, Menu, More, Plus, Search, Setting, User } from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)
const icons = { Edit, Delete, Search, ArrowRight, ArrowLeft, More, Plus, Setting, Menu, User }

for (const [key, component] of Object.entries(icons)) {
  app.component(key, component)
} 

app.use(ElementPlus)
app.use(router)
app.mount('#app')
