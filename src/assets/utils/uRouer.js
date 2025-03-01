import router from '@/router'
import { uCommon } from '@/assets/utils'
import { useRoute } from 'vue-router'

const getRouterInfoByMenuId = (menuId) => {
 return router.getRoutes().filter(r => r.meta.menuId === menuId)
}

/*
by MenuId 는 store에 마지막 메뉴 menuId정보를 저장/유지한다.
참고: aside menu의 이벤트 마지막 상태값을 유지하기 위해...
*/
const goToByMenuId = (menuId, params) => {
 params = params || null
 storeGlobal.setLastMenuMenuId(menuId)

 try {
   const routerInfo = router.getRoutes().filter(r => r.meta.menuId === menuId)
   if (routerInfo.length !== 0) {
     router.push({ name: routerInfo[0].name, params: params })
   } else {
     router.replace('Error', { title: errorMsg.e401.status, message: errorMsg.e401.message[1] })
   }
 } catch (error) {
   alert('DB와 router 에 정의된 메뉴 구조 맞지 않음! 확인바람!')
 }
}

export default {
 getRouterInfoByMenuId,
 goToByMenuId
}