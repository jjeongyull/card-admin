import router from '@/router'
import { uNewCommon } from '@/utils'
import { useRoute } from 'vue-router'

// 임시 데이터
import menuData from '@/data/menu.json';
import { ref } from 'vue';
const menuList = ref(menuData);

/*
권한메뉴 초기화
routes meta 정보에 로그인 후 획득한 menu 권한정보 등을 셋 한다.
물리적 router(index.js)와 구조의 meta 정보에 논리적 DB 권한 정보를 셋
*/
const initRoutesWithMenuRole = () => {
  const routerInfo = router.getRoutes()
  // const menuRole = storeGlobal.getMenuRole()
  routerInfo.forEach(r => {
    const menuId = r.meta.menuId
    if (menuId !== undefined) {
      const mr = uNewCommon.findItemWidthParents(menuList, 'menuId', menuId, '.')
      if (mr !== null && mr.length) {
        const current = mr[mr.length - 1]
        r.meta.auth = { title: current.title, permit: current.permit }
        r.meta.fullPath = mr
      }
    }
  })
}

const getRouterInfoByMenuId = (menuId) => {
 return router.getRoutes().filter(r => r.meta.menuId === menuId)
}

/*
by MenuId 는 store에 마지막 메뉴 menuId정보를 저장/유지한다.
참고: aside menu의 이벤트 마지막 상태값을 유지하기 위해...
*/
const goToByMenuId = (menuId, params) => {
 params = params || null
//  storeGlobal.setLastMenuMenuId(menuId)

 try {
   const routerInfo = router.getRoutes().filter(r => r.meta.menuId === menuId)
   console.log(routerInfo)
   if (routerInfo.length !== 0) {
    console.log(routerInfo[0])
    console.log(routerInfo[0].name)
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
 goToByMenuId,
 initRoutesWithMenuRole
}