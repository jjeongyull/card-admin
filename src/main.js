import { ArrowLeft, ArrowRight, Delete,
    Edit, Menu, More, Plus, Search, Setting,
    User, Operation, UploadFilled, Calendar, Warning,
    Download, Refresh, Clock
  } from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

import VueTablerIcons from 'vue-tabler-icons'
import '@/assets/styles/etc/tabler-icons/tabler-icons.min.css'


import { createPinia } from "pinia";
import components from "@/components";

const app = createApp(App)
const pinia = createPinia();
const icons = { Edit, Delete, Search,
  ArrowRight, ArrowLeft, More, Plus,
  Setting, Menu, User, Operation,
  UploadFilled, Calendar, Warning,
  Download, Refresh, Clock
}

for (const [key, component] of Object.entries(icons)) {
  app.component(key, component)
}

app.use(pinia);
app.use(ElementPlus)
app.use(components)
app.use(router)
app.use(VueTablerIcons)
app.mount('#app')
