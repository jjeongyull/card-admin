import { ArrowLeft, ArrowRight, Delete,
    Edit, Menu, More, Plus, Search, Setting,
    User, Operation, UploadFilled, Calendar, Warning,
    Download, Refresh, Clock, UserFilled, Document, Upload, CircleCheckFilled,
    WarningFilled
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

import { CarbonIconsVue } from '@carbon/icons-vue';
import Bee32 from '@carbon/icons-vue/es/bee/32';

const app = createApp(App)
const pinia = createPinia();
const icons = { Edit, Delete, Search,
  ArrowRight, ArrowLeft, More, Plus,
  Setting, Menu, User, Operation,
  UploadFilled, Calendar, Warning,
  Download, Refresh, Clock, UserFilled, Document,
  Upload, CircleCheckFilled, WarningFilled
}

for (const [key, component] of Object.entries(icons)) {
  app.component(key, component)
}

app.use(pinia);
app.use(ElementPlus)
app.use(components)
app.use(router)
app.use(VueTablerIcons)
app.use(CarbonIconsVue, {
  components: {
    Bee32,
  },
});
app.mount('#app')
