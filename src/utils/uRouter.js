import router from '@/router'
import { uNewCommon } from '@/utils'


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

/**
 * 주어진 path 값으로 routes 배열에서 해당하는 menuId와 menu 객체를 찾아 반환하는 함수
 * @param {string} path - 찾고자 하는 경로
 * @returns {Object|null} - { menuId, menu } 객체 반환, 없으면 `null`
 */
const findMenuByPath = (path) => {
  // 1. Vue Router에서 해당 path에 맞는 menuId 찾기
  const searchMenuId = (path, routes) => {
    for (let route of routes) {
      if (route.path === path && route.meta?.menuId) {
        return route.meta.menuId;
      }
      if (route.children && route.children.length > 0) {
        let found = searchMenuId(path, route.children);
        if (found) return found;
      }
    }
    return null;
  };

  // 2. `/` 경로는 기본값 `menuId: "1"` 설정
  const menuId = path === "/" ? "1" : searchMenuId(path, router.getRoutes());
  if (!menuId) return null;

  // 3. menuList에서 해당 menuId에 맞는 객체 찾기
  const searchMenu = (menuId, menus) => {
    for (let menu of menus) {
      if (menu.menuId === menuId) return menu;
      if (menu.children && menu.children.length > 0) {
        let found = searchMenu(menuId, menu.children);
        if (found) return found;
      }
    }
    return null;
  };

  const menu = searchMenu(menuId, menuList.value);
  return menu ? { menu } : null;
};

/*
by name 은 store에 마지막 메뉴 menuId정보를 저정하지 않는다.
참고: aside menu 이벤트가 아니고, 내부 메뉴 이동시 활용!
*/
const goToByName = (name, params) => {
  try {
    router.push({ name: name, params: params || null })
  } catch (error) {
    console.log(error)
  }
}

export default {
 getRouterInfoByMenuId,
 goToByMenuId,
 initRoutesWithMenuRole,
 findMenuByPath,
 goToByName
}