import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/default/Layout.vue'

const routes = [
  {
    path: '/dashboard',
    component: DefaultLayout,
    redirect: '/dashboard/summary',
    children: [
      {
        path: 'summary',
        name: 'DashboardSummary',
        component: () => import('@/pages/dashboard/main/Summary.vue'),
      }
    ]
  },
  {
    path: '/policy',
    component: DefaultLayout,
    redirect: '/policy/management',
    children: [
      {
        path: 'management',
        name: 'PolicyManagement',
        component: () => import('@/pages/policy/PolicyManagement.vue'),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router
