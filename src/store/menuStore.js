import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import menuData from "@/data/menu.json";
import { uRouter } from '@/utils'

export const useMenuStore = defineStore("menuStore", () => {
  const menuList = ref(menuData);
  const selectedMenu = ref(null);
  const route = useRoute();

  /**
   * 메뉴 ID를 기반으로 트리 구조에서 해당 메뉴를 찾아 반환하는 함수
   * @param {*} id 찾고자 하는 메뉴의 ID
   * @param {*} menus 탐색할 메뉴 리스트 (트리 구조)
   * @returns 일치하는 메뉴 객체를 반환, 찾지 못하면 `null` 반환
   */
  const findMenuById = (id, menus) => {
    for (let menu of menus) {
      if (menu.menuId === id) return menu;
      if (menu.children?.length) {
        let found = findMenuById(id, menu.children);
        if (found) return found;
      }
    }
    return null;
  };

  // 현재 라우트 기반으로 메뉴 설정 (새로고침 또는 페이지 이동 시)
  const setSelectedMenuByRoute = () => {
    const savedMenuId = localStorage.getItem("selectedMenuId");
    const matchedRoute = savedMenuId || route.meta.menuId;

    if (matchedRoute) {
      selectedMenu.value = findMenuById(matchedRoute, menuList.value);
      // 서브메뉴가 없는 경우 `selectedMenu`를 초기화 (사이드바 숨김)
      if (!selectedMenu.value || !selectedMenu.value.children.length) {
        selectedMenu.value = null;
      }
    } else {
      selectedMenu.value = null;
    }
  };

  /**
   * @param {*} menu 선택된 메뉴의 객체
   * 1. selectedMenu에 값을 저장 시킨다
   * 2. localStorage에 menu.menuId값을 저장 시킨다
   * 3. 페이지 이동을 시킨다
   */
  const selectMenu = (menu) => {
    selectedMenu.value = menu;
    localStorage.setItem("selectedMenuId", menu.menuId);
    uRouter.goToByMenuId(menu.menuId);
  };

  // 현재 선택된 메뉴의 하위 메뉴 (서브메뉴)
  const subMenu = computed(() => selectedMenu.value?.children || []);

  // 페이지 새로고침 시 메뉴 설정 유지
  watch(route, () => {
    setSelectedMenuByRoute();
  });

  // 뒤로가기 이벤트 감지 (브라우저 히스토리 변경)
  const handlePopState = () => {
    console.log("🔙 뒤로가기 감지됨 - 메뉴 업데이트");
    setSelectedMenuByRoute();
  };


  return {
    menuList,
    selectedMenu,
    subMenu,
    selectMenu,
    setSelectedMenuByRoute,
    handlePopState
  };
});
