import { defineAsyncComponent } from "vue";

// 공통 컴포넌트 자동 등록
const components = {
  BaseButton: defineAsyncComponent(() => import("./base/BaseButton.vue")),
  BaseCard: defineAsyncComponent(() => import("./base/BaseCard.vue")),
  BaseButtonTab: defineAsyncComponent(() => import("./base/BaseButtonTab.vue")),
  BaseList: defineAsyncComponent(() => import("./base/BaseList.vue")),
  BaseSelect: defineAsyncComponent(() => import("./base/BaseSelect.vue")),
  BaseMenuItem: defineAsyncComponent(() => import("./base/BaseMenuItem.vue")),
  BaseSidebarItems: defineAsyncComponent(() => import("./base/BaseSidebarItems.vue")),
  BaseTable: defineAsyncComponent(() => import("./tables/BaseTable.vue")),
  BaseChart: defineAsyncComponent(() => import("./charts/BaseChart.vue")),
  Calendar: defineAsyncComponent(() => import("./calendar/CalendarComponent.vue")),
  CalendarPopup: defineAsyncComponent(() => import("./calendar/CalendarPopup.vue")),
  TreeComponent: defineAsyncComponent(() => import("./tree/TreeComponent.vue")),
  ChangeLogDialog: defineAsyncComponent(() => import("./dialogs/ChangeLogDialog.vue")),
  ExtraList: defineAsyncComponent(() => import("./others/ExtraList.vue")),
  LogList: defineAsyncComponent(() => import("./others/LogList.vue")),
  CategoryCard: defineAsyncComponent(() => import("./others/CategoryCard.vue")),
};

// 컴포넌트 전역 등록
export default {
  install(app) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });
  },
};

// 개별 사용을 위한 내보내기
export { components };
