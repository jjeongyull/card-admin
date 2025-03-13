import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/default/Layout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    redirect: '/',
    children: [
      {
        path: '',
        name: 'DashboardSummary',
        component: () => import('@/pages/dashboard/Summary.vue'),
        meta: {
          menuId: '1',
          icon: 'ti ti-layout-grid',
          /* { auth, fullPath 정보는 로그인 후 auth store의 menuRole 정보와 매칭, 조합하여 사용함 (초기화 루틴은 AsieMenuBar.vue 참조 ) */
          auth: null,
          fullPath: []
        }
      }
    ]
  },
  {
    path: '/policy',
    redirect: '/policy',
    name: 'policyManagement',
    component: DefaultLayout,
    meta: { menuId: '2', icon: 'ti ti-list-details' },
    children: [
      {
        // 단위정책관리
        path: '',
        name: 'management',
        component: () => import('@/pages/policy/PolicyManagement.vue'),
        meta: { menuId: '2.1', icon: '', auth: null, fullPath: [], isNested: true }
      },
      {
        // 컴플라이언스관리
        path: 'compliance-policy',
        component: () => import('@/pages/policy/PolicyComplianceMain.vue'),
        children: [
          {
            path: '',
            name: 'CompliancePolicyManage',
            component: () => import('@/pages/policy/ComplianceMain.vue'),
            meta: { menuId: '2.2', icon: '', auth: null, fullPath: [], isNested: true }
          }
        ]
      }
    ]
  },
  {
    path: '/assets',
    redirect: '/assets',
    name: 'assetsGroup',
    component: DefaultLayout,
    meta: { menuId: '3', icon: 'ti ti-list-details' },
    children: [
      {
        // 자산현황
        path: '',
        name: 'assetsView',
        component: () => import('@/pages/asssets/AssetGroup.vue'),
        meta: { menuId: '3.1', icon: '', auth: null, fullPath: [], isNested: true }
      },
      {
        // 자산정보관리
        path: '/assets-setting',
        name: 'assetsSet',
        component: () => import('@/pages/asssets/AssetSetting.vue'),
        meta: { menuId: '3.2', icon: '', auth: null, fullPath: [], isNested: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});


export default router
