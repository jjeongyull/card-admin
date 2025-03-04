import { ref } from "vue";
import { apiService } from "@/services/api";

export function useFetch() {
  const data = ref(null); // API 응답 데이터
  const error = ref(null); // 에러 상태
  const loading = ref(false); // 로딩 상태

  /**
   * API 요청 함수
   * @param {string} method - 요청 방식 ('get', 'post', 'put', 'delete')
   * @param {string} endpoint - API 요청 경로 (ex: "/users")
   * @param {Object} [payload] - 요청 데이터 또는 파라미터
   */
  const fetchData = async (method, endpoint, payload = {}) => {
    loading.value = true; // 로딩 시작
    error.value = null;

    try {
      let response;
      switch (method.toLowerCase()) {
        case "get":
          response = await apiService.get(endpoint, payload);
          break;
        case "post":
          response = await apiService.post(endpoint, payload);
          break;
        case "put":
          response = await apiService.put(endpoint, payload);
          break;
        case "delete":
          response = await apiService.delete(endpoint, payload);
          break;
        default:
          throw new Error("올바르지 않은 HTTP 메서드입니다.");
      }

      data.value = response.data;
    } catch (err) {
      error.value = err.message || "API 요청 중 오류 발생";
      console.error("API 요청 에러:", err);
    } finally {
      loading.value = false; // 로딩 완료
    }
  };

  return { data, error, loading, fetchData };
}
