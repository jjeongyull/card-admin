import { defineStore } from "pinia";
/**
 * 
 * state: Pinia에서 관리할 데이터를 저장 count: 0, user: { name: "John" }
 * actions: state값을 변경하는 함수
 * getters: 상태 데이터를 가공하여 반환 (캐싱 지원) -> 컴포넌트에서 호출하면 기존의 데이터를 getter로 계산된 데이터를 불러온다
 * 
 */
export const useAuthStore = defineStore("auth", {
  state: () => ({
   user: null,
   counter: 0
  }),
  actions: {
    login(user) {
      this.user = user;
    },
    logout() {
      this.user = null;
    },
  },
  getters: {
   userName: (state) => state.user.name, // 상태 값 반환
   upperCaseUserName: (state) => state.user.name.toUpperCase()
  },
});